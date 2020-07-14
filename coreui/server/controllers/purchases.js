const objectid = require("mongoose").Types.ObjectId;
const Purchase = require('../models/purchase');

exports.createPurchases = (req, res) => {
    let newPurchase = new Purchase({
      //  sino: req.body.sino,
        suplierName: req.body.suplierName,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        product: req.body.product,
        grade: req.body.grade,
        quality: req.body.quality,
        rate: req.body.rate,
        amount: req.body.amount,
        transportCharge: req.body.transportCharge,
        miscCharge: req.body.miscCharge,
        totalPurchaseAmount: req.body.totalPurchaseAmount,
        paymentStatus: req.body.paymentStatus,
        creator: req.query.id
    });
   
    newPurchase.save((err, purchase) => {
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Purchase Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Purchase added successfully',
                    purchase
                })
            }
        })
        

}

exports.getPurchasesByCreator = (req, res)=>{
    Purchase.find({ 

        'creator': { $in: [ 
        
            objectid(req.query.id),
        
      
        
        ]} 
        
        },(err, purchase) => {
         if(!err) {
             res.send(purchase)
         }
    }
)}

exports.getPurchaseById = (req, res, ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

    Purchase.findById(req.params.id, (err, purchase) => {
        if (!err) { res.send(purchase) }
        else { console.log('update error' + err) }
    });
}

exports.updatePurchase = (req, res, ) => {
    Purchase.findByIdAndUpdate(req.params.id, { $set:{
   // sino: req.body.sino,
    suplierName : req.body.suplierName,
    address : req.body.address,
    contactNumber  : req.body.contactNumber,
    product :  req.body.product,
    grade : req.body.grade,
    quality : req.body.quality,
    rate : req.body.rate,
    amount : req.body.amount,
    transportCharge : req.body.transportCharge,
    miscCharge : req.body.miscCharge,
    totalPurchaseAmount : req.body.totalPurchaseAmount,
    paymentStatus : req.body.paymentStatus,
       
    } }, { new: true }, (err, purchase) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
}

exports.deletePurchase = (req, res) => {
    Purchase.findByIdAndRemove( req.params.id ,(err, purchase ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                purchase,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
}