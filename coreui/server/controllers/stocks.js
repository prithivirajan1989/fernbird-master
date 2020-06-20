const objectid = require("mongoose").Types.ObjectId;
const StockRegister = require("../models/stockRegister"); 

exports.createStock = (req, res) => {
   
    let newStock = new StockRegister({
        stockPoint: req.body.sstockPoint,
        product: req.body.sproduct,
        grade: req.body.sgrade,
        units: req.units,
        openingStock: req.body.sopeningStock,
        stockIn: req.body.sstockIn,
        stockOut: req.body.sstockOut,
        creator: req.query.id
    });
   
    newStock.save((err, stock) => {
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Stock Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Stock added successfully',
                    stock
                })
            }
        })
        

}


exports.getStocksByCreator = (req, res)=>{
    StockRegister.find({ 

        'creator': { $in: [ 
        
        objectid(req.query.id),
        
      
        
        ]} 
        
        },(err, stock) => {
         if(!err) {
             res.send(stock)
         }
    }
)}

exports.getStockById =  (req, res ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

    StockRegister.findById(req.params.id, (err, stock) => {
        if (!err) { res.send(stock) }
        else { console.log('update error' + err) }
    });
}


exports.updateStock = (req, res, ) => {
    StockRegister.findByIdAndUpdate(req.params.id, { $set:{
    stockPoint:req.body.stockPoint,
    product:req.body.product,
    grade:req.body.grade,
    unit:req.body.unit,
    openingStock:req.body.openingStock,
    stockIn:req.body.stockIn,
    stockOut:req.body.stockOut,
    } }, { new: true }, (err, stock) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
}

exports.deleteStock = (req, res) => {
    StockRegister.findByIdAndRemove( req.params.id ,(err, stock ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                stock,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
}