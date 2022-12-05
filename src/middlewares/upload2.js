const multer = require("multer");
const SharpMulter  =  require("sharp-multer");
const path = require("path");
const sharpMulter = require("sharp-multer");

const storage = 

SharpMulter ({
  destination:(req, file, callback) =>callback(null, "./upload"),
  imageOptions:{
   fileFormat: ".jpg",
   quality: 80,
   resize: { width: 500, height: 500 },
     },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtentions = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + fileExtentions);
    },
});

// multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, "./upload");
//   // },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtentions = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + fileExtentions);
//   },
// });

const upload = sharpMulter({ storage: storage });

module.exports = upload;