const mongoose = require('mongoose')



const StockRegisterSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    date: {
        type: Date,
        default: Date.now
    },
    stockPoint: {
        type: String
    },
    product: {
        type: String
    },
    grade: {
        type: String
    },
    unit: {
        type: Number
    },
    openingStock: {
        type: String
    },
    stockIn:{
        type: String
    },
    stockOut:{
        type: String
    }
    
})

const stockRegister = module.exports = mongoose.model('StockRegister', StockRegisterSchema);


module.exports.getUserById = function (id, callback){
    stockRegister.findById(id, callback);
}




module.exports = stockRegister;