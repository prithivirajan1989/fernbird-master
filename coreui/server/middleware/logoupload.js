const multer = require("multer");

const path = require("path");

const brandStore = multer.diskStorage({
    destination: "uploads/logo/",
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

//upload image middleware

module.exports = multer({
    storage: brandStore,
}).single("file");