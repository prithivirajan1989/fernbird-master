const mongoose = require('mongoose')



const BillSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    vendorName: {
        type: String
    },
    vendorNo: {
        type: Number
    },
    vendorEmail: {
        type: String
    },
    billNo: {
        type: String
    },
    billDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    billType:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Bill = module.exports = mongoose.model('Bill', BillSchema);


module.exports.getUserById = function (id, callback){
    Bill.findById(id, callback);
}




module.exports = Bill;