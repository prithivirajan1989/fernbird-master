const mongoose = require('mongoose')



const InvoiceSchema = mongoose.Schema({
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
    customerGstn: {
        type: String
    },
    invoiceNumber: {
        type: String
    },
    invoiceDate:{
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Invoice = module.exports = mongoose.model('Invoice', InvoiceSchema);


module.exports.getUserById = function (id, callback){
    Invoice.findById(id, callback);
}




module.exports = Invoice;