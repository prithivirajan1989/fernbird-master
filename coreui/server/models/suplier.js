const mongoose = require('mongoose')



const SuplierSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    // sino: {
    //     type: Number
    // },
    suplierName: {
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
        type: Number
    },
    status:{
        type: String
    },
    product:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Supliers = module.exports = mongoose.model('Supliers', SuplierSchema);


module.exports.getUserById = function (id, callback){
    Supliers.findById(id, callback);
}




module.exports = Supliers;