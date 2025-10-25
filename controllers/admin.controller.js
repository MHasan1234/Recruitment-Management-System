const Job = require('../models/Job');
const User = require('../models/User');
const Profile = require('../models/Profile');

exports.createJob = async (req, res) => {
  const { title, description, companyName } = req.body;

  try {
    const job = new Job({
      title,
      description,
      companyName,
      postedBy: req.user._id,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.job_id)
      .populate('postedBy', 'name email')
      .populate('applicants', 'name email profileHeadline'); 

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await User.find({ userType: 'Applicant' })
      .select('-passwordHash')
      .populate('profile', 'skills profileHeadline');
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getApplicantProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ applicant: req.params.applicant_id })
      .populate('applicant', 'name email userType');
      
    if (profile) {
      res.json(profile);
    } else {
      const user = await User.findById(req.params.applicant_id);
      if (user && user.userType === 'Applicant') {
        return res.status(404).json({ message: 'Applicant exists but has not uploaded a resume yet.' });
      }
      res.status(404).json({ message: 'Applicant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};