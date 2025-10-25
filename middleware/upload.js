const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, `resume-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|docx/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only PDF and DOCX files are allowed!');
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, 
  fileFilter: fileFilter
}).single('resume'); 

module.exports = upload;