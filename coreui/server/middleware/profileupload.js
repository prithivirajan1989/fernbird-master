const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
        console.log(file);
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

//upload image middleware

module.exports = multer({
    storage: storage,
}).single("file");