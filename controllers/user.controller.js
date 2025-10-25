const Profile = require('../models/Profile');
const Job = require('../models/Job');
const axios = require('axios');
const fs = require('fs');


exports.uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;

  try {
    const fileData = fs.readFileSync(filePath);

    const apiResponse = await axios.post(
      process.env.RESUME_API_URL,
      fileData,
      {
        headers: {
          'apikey': process.env.RESUME_API_KEY,
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    const extractedData = apiResponse.data;

    const educationStr = extractedData.education ? JSON.stringify(extractedData.education) : '';
    const experienceStr = extractedData.experience ? JSON.stringify(extractedData.experience) : '';
    const skillsStr = extractedData.skills ? extractedData.skills.join(', ') : '';

    const updatedProfile = await Profile.findOneAndUpdate(
      { applicant: req.user._id },
      {
        resumeFileAddress: filePath,
        name: extractedData.name || req.user.name,
        email: extractedData.email || req.user.email,
        phone: extractedData.phone || '',
        skills: skillsStr,
        education: educationStr,
        experience: experienceStr,
      },
      { new: true, upsert: true } 
    );

    res.status(200).json({
      message: 'Resume uploaded and processed successfully',
      data: updatedProfile,
    });

  } catch (error) {
    console.error('API call error:', error.message);
    res.status(500).json({ message: 'Error processing resume' });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name companyName');
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.applyForJob = async (req, res) => {
  const { job_id } = req.query;

  try {
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    job.applicants.push(req.user._id);
    job.totalApplications = job.applicants.length;
    await job.save();

    res.json({ message: 'Successfully applied for the job' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};