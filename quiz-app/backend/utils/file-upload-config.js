const multer = require("multer");
const path = require("path");

///////////////// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

///////////////// Initialize upload variable with storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    ///////////////// Accept specific file formats
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx|txt/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "File upload only supports the following filetypes - " + filetypes
        )
      );
    }
  },
});

module.exports = upload;
