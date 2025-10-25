const express = require('express');
const router = express.Router();
const { protect, isApplicant } = require('../middleware/auth');
const { 
  getAllJobs, 
  applyForJob 
} = require('../controllers/user.controller');

router.get('/', protect, getAllJobs);
router.get('/apply', protect, isApplicant, applyForJob);

module.exports = router;