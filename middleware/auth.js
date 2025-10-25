const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-passwordHash');
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};


exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.userType === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an Admin' });
  }
};


exports.isApplicant = (req, res, next) => {
  if (req.user && req.user.userType === 'Applicant') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an Applicant' });
  }
};