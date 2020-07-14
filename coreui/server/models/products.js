const mongoose = require('mongoose')



const ProductsSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true },
    itemcode: {
        type: String
    },
    itemname: {
        type: String
    },
    unit: {
        type: String
    },
    grade: {
        type: String
    },
    dlength: {
        type: String
    },
    dwidth:{
        type: String
    },
    weight:{
        type: String
    },
    sellingprice:{
        type: String
    },
    purchaseprice:{
        type: String
    },
    description:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Products = module.exports = mongoose.model('Products', ProductsSchema);


module.exports.getUserById = function (id, callback){
    Products.findById(id, callback);
}




module.exports = Products;