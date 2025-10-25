const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const { 
  createJob, 
  getJobById, 
  getAllApplicants, 
  getApplicantProfile 
} = require('../controllers/admin.controller');

router.post('/job', protect, isAdmin, createJob);
router.get('/job/:job_id', protect, isAdmin, getJobById);
router.get('/applicants', protect, isAdmin, getAllApplicants);
router.get('/applicant/:applicant_id', protect, isAdmin, getApplicantProfile);

module.exports = router;