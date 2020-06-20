const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const config = require("../config/config");

const messagebird = require("messagebird")("JGEQg0AI2PcCngpDZL5KtsOvl");

const objectid = require("mongoose").Types.ObjectId;

exports.registerUser = (req, res) => {
    let newUser = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        mobilenumber: req.body.user.mobilenumber,
        password: req.body.user.password,
        image: "uploads/5.jpg",
        brandlogo: "uploads/logo/logo.png",
        role: 1,
        creator: req.body.userId || null,
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            let msg = "";
            if (err.errors.email) msg += "Email already exists.";
            if (err.errors.mobilenumber) msg += "Mobilenumber already exists";
            res.json({
                success: false,
                msg,
            });
        } else {
            return res.json({
                success: true,
                msg: "Registered Succesfully",
                user,
            });
        }
    });
};

exports.authenticateUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: "User Not Found Please Register!!",
            });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                let payload = {
                    user: {
                        id: user._id,
                    },
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: "3h", // weak
                });

                res.json({
                    success: true,
                    token: token,
                    expiresIn: (3600 * 3),
                    msg: `Welcome Back!!`,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobilenumber: user.mobilenumber,
                        role: user.role,
                        image: `http://localhost:3000/${user.image}`,
                        brandlogo: `http://localhost:3000/${user.brandlogo}`,
                        creator: user.creator,
                    },
                });
            } else {
                return res.json({
                    success: false,
                    msg: "Wrong Password",
                });
            }
        });
    });
};

exports.getUsersByCreator = (req, res) => {
    User.find({
        'creator': {
            $in: [objectid(req.query.id)]
        },
    },
    (err, users) => {
        if (!err) {
            res.send(users);
        }
    }
);
};

exports.updateUser = (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: `No records found with given id ${req.params.id} `,
        });
    const password = req.body.password;

    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        if (user) {
            User.comparePassword(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    User.findByIdAndUpdate(
                        req.params.id, {
                            $set: {
                                name: req.body.name,
                                email: req.body.email,
                                mobilenumber: req.body.mobilenumber,
                            },
                        }, {
                            new: true,
                        },
                        (err, user) => {
                            if (err) throw err;
                            else {
                                return res.json({
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        mobilenumber: user.mobilenumber,
                                        role: user.role,
                                        image: `http://localhost:3000/${user.image}`,
                                        brandlogo: `http://localhost:3000/${user.brandlogo}`,
                                        creator: user.creator,
                                    },
                                    success: true,
                                    msg: `${user.name} Profile Details Updated!!`,
                                });
                            }
                        }
                    );
                }
            });
        }
    });
};

exports.forgetPassword = async (req, res) => {
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    User.findByIdAndUpdate(
        req.params.id, {
            $set: {
                password: hashedPw,
            },
        }, {
            new: true,
        },
        (err, user) => {
            if (err) throw err;
            else {
                return res.json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobilenumber: user.mobilenumber,
                        role: user.role,
                        image: `http://localhost:3000/${user.image}`,
                        brandlogo: `http://localhost:3000/${user.brandlogo}`,
                    },
                    success: true,
                    msg: `${user.name} Password Updated!!`,
                });
            }
        }
    );
};

exports.profileImageUpload = (req, res, next) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: `No records found with given id ${req.params.id} `,
        });

    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        if (user) {
            User.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        image: req.file.path,
                    },
                }, {
                    new: true,
                },
                (err, user) => {
                    if (err) throw err;
                    else {
                        return res.json({
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                mobilenumber: user.mobilenumber,
                                role: user.role,
                                image: `http://localhost:3000/${user.image}`,
                                brandlogo: `http://localhost:3000/${user.brandlogo}`,
                                creator: user.creator,
                            },
                            success: true,
                            msg: "Profile Image Updated!!!",
                        });
                    }
                }
            );
        }
    });
};

exports.logoUpload = (req, res, next) => {
    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        if (user) {
            User.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        brandlogo: req.file.path,
                    },
                }, {
                    new: true,
                },
                (err, user) => {
                    if (err) throw err;
                    else {
                        return res.json({
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                mobilenumber: user.mobilenumber,
                                role: user.role,
                                image: `http://localhost:3000/${user.image}`,
                                brandlogo: `http://localhost:3000/${user.brandlogo}`,
                            },
                            success: true,
                            msg: "Brand Logo Updated!!!",
                        });
                    }
                }
            );
        }
    });
};

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: " User Cant be deleted!!",
            });
        } else {
            return res.json({
                user,
                success: true,
                msg: ` Deleted!!`,
            });
        }
    });
};

exports.getAllusers = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            res.send(users);
        }
    });
};

exports.getUserById = (req, res, next) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: "No records found with given id",
        });

    User.findById(req.params.id, (err, user) => {
        if (!err) {
            res.send(user);
        } else {
            console.log("update error" + err);
        }
    });
};

exports.messageOtp = (req, res) => {
    const number = req.body.number;
    messagebird.verify.create(
        number, {
            originator: "Code",
            template: "Your verification code is %token.",
        },
        function (err, response) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false,
                    msg: "otp sent failed",
                    error: err.errors[0].description,
                });
            } else {
                console.log(response);
                res.status(200).json({
                    success: true,
                    msg: "otp sent succesfully",
                    id: response.id,
                    number: req.body.number,
                });
            }
        }
    );
};

exports.messageVerify = (req, res) => {
    const id = req.body.id;
    const token = req.body.token;
    const number = req.body.number;

    messagebird.verify.verify(id, token, (err, response) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: "otp sent failed",
                error: err.errors[0].description,
                id: id,
            });
        } else {
            if (response) {
                User.getUserByMobileNumber(number, (err, user) => {
                    if (err) throw err;
                    if (user) {
                        let payload = {
                            subject: user._id,
                        };
                        const token = jwt.sign(payload, "secretkey", {
                            expiresIn: 604800, // weak
                        });

                        res.json({
                            msg: "User Successfully logged in",
                            success: true,
                            token: "JWT" + token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                mobilenumber: user.mobilenumber,
                            },
                        });
                    }
                });
            }
        }
    });
};