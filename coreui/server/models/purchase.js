const mongoose = require('mongoose')



const PurchaseSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    sino: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    suplierName: {
        type: String
    },
    address: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    product: {
        type: String
    },
    quality: {
        type:String
    },
    grade:{
        type: String
    },
    rate:{
        type: Number
    },
    amount:{
        type: Number
    },
    transportCharge:{
        type: Number
    },
    miscCharge:{
        type: Number
    },
    totalPurchaseAmount:{
        type: Number
    },
    paymentStatus:{
        type: String
    },

    
})

const Purchase = module.exports = mongoose.model('Purchase', PurchaseSchema);


module.exports.getUserById = function (id, callback){
    Purchase.findById(id, callback);
}




module.exports = Purchase;