const express = require("express");
const router = express.Router();

const extractProfileIMage = require("../middleware/profileupload");
const extractlogoIMage = require("../middleware/logoupload");
const UserController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

//register
router.post("/register", UserController.registerUser);

//authenticate

router.post("/authenticate", UserController.authenticateUser);

//get a desired user

router.get("", checkAuth, UserController.getUsersByCreator);

///get all users

router.get("/users", UserController.getAllusers);

router.get("/:id", UserController.getUserById);

// update user details

router.put("/update/:id", UserController.updateUser);

//forget password
router.put("/forgetpassword/:id", UserController.forgetPassword);

//profile image upload

router.put(
    "/uploadfile/:id",
    extractProfileIMage,
    UserController.profileImageUpload
);

//Brand image upload

router.put("/brandlogo/:id", extractlogoIMage, UserController.logoUpload);

////delete users

router.delete("/:id", UserController.deleteUser);

//profile

// router.get('/user/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.json({
//         user: req.user
//     });
//     next();
// })
// router.post('/login', (req, res) => {
//     let userData = req.body

//     User.findOne({
//         email: userData.email,
//         number: userData.number
//     }, (error, user) => {
//         if (error) {
//             console.log(error)
//         } else {
//             if (!user) {
//                 res.status(401).json({
//                     success: false,
//                     msg: 'Invalid Email'
//                 })
//             } else
//                 if (user.password != userData.password) {
//                     res.status(401).json({
//                         success: false,
//                         msg: 'Invalid Password'
//                     })
//                 } else {
//                     let payload = { subject: user._id }
//                     let token = jwt.sign(payload, 'secretkey', {
//                         expiresIn: 6000
//                     })
//                     res.json({
//                         success: true,
//                         token: 'JWT' + token,
//                         user: {
//                             id: user._id,
//                             name: user.name,
//                             username: user.username,
//                             email: user.email
//                         }
//                     });
//                 }
//         }
//     })
// })

// Message bird

router.post("/otp", UserController.messageOtp);

// verfication

router.post("/verify", UserController.messageVerify);

module.exports = router;