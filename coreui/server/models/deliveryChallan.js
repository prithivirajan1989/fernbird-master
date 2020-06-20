const mongoose = require('mongoose')



const DeliveryChallanSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    customerName: {
        type: String
    },
    customerNo: {
        type: Number
    },
    customerEmail: {
        type: String
    },
    challanNo: {
        type: String
    },
    challanDate: {
        type: Date
    },
    challanType:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const DeliveryChallan = module.exports = mongoose.model('DeliveryChallan', DeliveryChallanSchema);


module.exports.getUserById = function (id, callback){
    DeliveryChallan.findById(id, callback);
}




module.exports = DeliveryChallan;