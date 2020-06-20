const mongoose = require('mongoose')



const SalesSchema = mongoose.Schema({
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
    salesOrderNo: {
        type: String
    },
    salesOrderDate: {
        type: Date
    },
    shipmentDate: {
        type: Date
    },
    salesPerson:{
        type: String
    },
    paymentType:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Sales = module.exports = mongoose.model('Sale', SalesSchema);


module.exports.getUserById = function (id, callback){
    Sales.findById(id, callback);
}




module.exports = Sales;