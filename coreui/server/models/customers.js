const mongoose = require('mongoose')



const CustomerSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    // sino: {
    //     type: Number
    // },
    customerName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    contactNumber:{
        type: String
    },

    deliveryMode: {
        type:String
    },
    status:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Customers = module.exports = mongoose.model('Customers', CustomerSchema);


module.exports.getUserById = function (id, callback){
    Customers.findById(id, callback);
}




module.exports = Customers;