const objectid = require("mongoose").Types.ObjectId;
const Products = require("../models/products");

exports.addProducts = (req, res) => {
    let newProduct = new Products({
        itemcode: req.body.itemcode,
        itemname: req.body.itemname,
        unit: req.body.unit,
        grade: req.body.grade,
        dlength: req.body.dlength,
        dwidth: req.body.dwidth,
        weight: req.body.weight,
        sellingprice: req.body.sellingprice,
        purchaseprice: req.body.purchaseprice,
        description: req.body.description,
        creator: req.query.id,
    });

    newProduct.save((err, product) => {
        if (err) {
            return res.json({
                success: false,
                msg: "Products Additon failed",
            });
        } else {
            return res.json({
                success: true,
                msg: "Products added successfully",
                product,
            });
        }
    });
};

exports.getProductsByCreator = (req, res) => {
    Products.find({
            'creator': {
                $in: [objectid(req.query.id)],
            },
        },
        (err, products) => {
            if (!err) {
                res.send(products);
            }
        }
    );
};

exports.getProductsById = (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: "No customer records found with given id",
        });

    Products.findById(req.params.id, (err, product) => {
        if (!err) {
            res.send(product);
        } else {
            console.log("update error" + err);
        }
    });
};

exports.UpdateProduct = (req, res) => {
    Products.findByIdAndUpdate(
        req.params.id, {
            $set: {
               
        itemname: req.body.itemname,
        unit: req.body.unit,
        grade: req.body.grade,
        dlength: req.body.dlength,
        dwidth: req.body.dwidth,
        weight: req.body.weight,
        sellingprice: req.body.sellingprice,
        purchaseprice: req.body.purchaseprice,
        description: req.body.description
            },
        }, {
            new: true,
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

exports.deleteProduct = (req, res) => {
    Products.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            return res.json({
                success: false,
                msg: " Customer Cant be deleted!!",
            });
        } else {
            return res.json({
                product,
                success: true,
                msg: " Deleted!!",
            });
        }
    });
};