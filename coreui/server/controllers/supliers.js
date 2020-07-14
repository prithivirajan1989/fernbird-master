const objectid = require("mongoose").Types.ObjectId;
const Supliers = require("../models/suplier");

exports.addSupliers = (req, res) => {
    let newSuplier = new Supliers({
      //  sino: req.body.sino,
        suplierName: req.body.suplierName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        contactNumber: req.body.contactNumber,
        status: req.body.status,
        product: req.body.product,
        creator: req.query.id,
    });

    newSuplier.save((err, suplier) => {
        if (err) {
            return res.json({
                success: false,
                msg: "Suplier Additon failed",
            });
        } else {
            return res.json({
                success: true,
                msg: "Suplier added successfully",
                suplier,
            });
        }
    });
};

exports.getSupliersByCreator = (req, res) => {
    Supliers.find({
            'creator': {
                $in: [objectid(req.query.id)]
            },
        },
        (err, supliers) => {
            if (!err) {
                res.send(supliers);
            }
        }
    );
};

exports.getSuplierById = (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: "No customer records found with given id",
        });

    Supliers.findById(req.params.id, (err, suplier) => {
        if (!err) {
            res.send(suplier);
        } else {
            console.log("update error" + err);
        }
    });
};

exports.updateSuplier = (req, res) => {
    Supliers.findByIdAndUpdate(
        req.params.id, {
            $set: {
               // sino: req.body.sino,
                suplierName: req.body.suplierName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                contactNumber: req.body.contactNumber,
                status: req.body.status,
                product: req.body.product,
            },
        }, {
            new: true
        },
        (err, suplierser) => {
            if (err) throw err;
            else {
                return res.json({
                    success: true,
                    msg: " Updated!!",
                });
            }
        }
    );
};

exports.deleteSuplier = (req, res) => {
    Supliers.findByIdAndRemove(req.params.id, (err, suplier) => {
        if (err) {
            return res.json({
                success: false,
                msg: " Customer Cant be deleted!!",
            });
        } else {
            return res.json({
                suplier,
                success: true,
                msg: " Deleted!!",
            });
        }
    });
};