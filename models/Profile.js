const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  resumeFileAddress: { type: String },
  skills: { type: String },
  education: { type: String },
  experience: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model('Profile', profileSchema);