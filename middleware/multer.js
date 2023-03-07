const multer = require("multer");
const path = require("path");
// const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  //   fileFilter: function (req, file, cb) {
  //     checkFileType(file, cb);
  //   },
});

const tempDir = path.join(__dirname, "temp");

const storageMulti = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadMulti = multer({
  storage: storageMulti,
  //   fileFilter: function (req, file, cb) {
  //     checkFileType(file, cb);
  //   },
}).single("image");

// Check file Type
// function checkFileType(file, cb) {
//   // Allowed ext
//   const fileTypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimeType = fileTypes.test(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only !!!");
//   }
// }

module.exports = { upload, uploadMulti };
