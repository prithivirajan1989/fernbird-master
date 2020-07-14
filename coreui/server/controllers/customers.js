const objectid = require("mongoose").Types.ObjectId;

const Customers = require("../models/customers");

exports.addCustomers = (req, res) => {
    let newCustomer = new Customers({
      //  sino: req.body.sino,
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        contactNumber: req.body.contactNumber,
        deliveryMode: req.body.deliveryMode,
        status: req.body.status,
        creator: req.query.id,
    });

    newCustomer.save((err, customer) => {
        if (err) {
            return res.json({
                success: false,
                msg: "customer Additon failed",
            });
        } else {
            return res.json({
                success: true,
                msg: "Customer added successfully",
            });
        }
    });
};

exports.getCustomerByCreator = (req, res) => {
    Customers.find({
            'creator': {
                $in: [objectid(req.query.id)]
            },
        },
        (err, customers) => {
            if (!err) {
                res.send(customers);
            }
        }
    );
};

exports.getCustomerById = (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: "No customer records found with given id",
        });

    Customers.findById(req.params.id, (err, customer) => {
        if (!err) {
            res.send(customer);
        } else {
            console.log("update error" + err);
        }
    });
};

exports.updateCustomer = (req, res) => {

    if (!objectid.isValid(req.params.id))
    return res.json({
        success: false,
        msg: "No customer records found with given id",
    });
    
    Customers.findByIdAndUpdate(
        req.params.id, {
            $set: {
               // sino: req.body.sino,
                customerName: req.body.customerName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                contactNumber: req.body.contactNumber,
                deliveryMode: req.body.deliveryMode,
                status: req.body.status,
            },
        }, {
            new: true
        },
        (err, user) => {
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

exports.deleteCustomer = (req, res) => {
    Customers.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) {
            return res.json({
                success: false,
                msg: " Customer Cant be deleted!!",
            });
        } else {
            return res.json({
                customer,
                success: true,
                msg: " Deleted!!",
            });
        }
    });
};