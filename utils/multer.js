const multer = require("multer");
const path = require("path");
//const cloudinary = require('cloudinary');
//const cloudinaryStorage = require('multer-storage-cloudinary');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (re1, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
