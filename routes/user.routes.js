const express = require('express');
const router = express.Router();
const { protect, isApplicant } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadResume } = require('../controllers/user.controller');

router.post('/uploadResume', protect, isApplicant, upload, uploadResume);

module.exports = router;