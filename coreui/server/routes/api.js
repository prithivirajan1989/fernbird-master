const express = require('express')

const mongoose = require('mongoose')

const Invoice = require('../models/invoice');

const DeliveryChallan = require('../models/deliveryChallan');

const Bill = require('../models/bills');

const Sales = require('../models/sales');


const router = express.Router()

const objectid = require('mongoose').Types.ObjectId;



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

router.get('/', (req, res) => {
    res.send('From api route')
})


/

router.post('/invoice', (req, res) => {
    let newInvoice = new Invoice();
    newInvoice.customerName = req.body.customerName;
    newInvoice.customerNo = req.body.customerNo;
    newInvoice.customerEmail = req.body.customerEmail;
    newInvoice.customerGstn = req.body.customerGstn;
    newInvoice.invoiceNumber = req.body.invoiceNumber;
    newInvoice.invoiceDate = req.body.invoiceDate;
    newInvoice.creator = req.body.userId;
    newInvoice.save((err, invoice) => {
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Invoice Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Invoice added successfully',
                    invoice
                })
            }
        })
        

})


router.get('/invoice/:id', (req, res)=>{
    Invoice.find({ 

        'creator': { $in: [ 
        
        mongoose.Types.ObjectId(req.params.id),
        
      
        
        ]} 
        
        }, (err,invoice) => {
         if(!err) {
             res.send(invoice)
         }
    }
)})



router.get('/invoice/:id', (req, res ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

    Invoice.findById(req.params.id, (err, invoice) => {
        if (!err) { res.send(invoice) }
        else { console.log('update error' + err) }
    });
});


router.put('/invoice/edit/:id',(req, res, ) => {
    Invoice.findByIdAndUpdate(req.params.id, { $set:{
        customerName:req.body.customerName,
        customerNo:req.body.customerNo,
        customerEmail:req.body.customerEmail,
        customerGstn:req.body.customerGstn,
        invoiceNumber:req.body.invoiceNumber,
        invoiceDate:req.body.stockIn,
   
    } }, { new: true }, (err, invoice) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
})


router.delete('/invoice/:id', (req, res) => {
    Invoice.findByIdAndRemove( req.params.id ,(err, invoice ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                invoice,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
})


///deliverychallan api call

router.post('/delivery', (req, res) => {
    console.log(req.body)
    let newDelivery = new DeliveryChallan();
    newDelivery.customerName = req.body.customerName;
    newDelivery.customerNo = req.body.customerNo;
    newDelivery.customerEmail = req.body.customerEmail;
    newDelivery.challanNo = req.body.challanNo;
    newDelivery.challanDate = req.body.challanDate;
    newDelivery.challanType = req.body.challanType;
    newDelivery.creator = req.body.userId;
    newDelivery.save((err, invoice) => {
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Invoice Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Delivery Challan added successfully',
                    invoice
                })
            }
        })
        

})


router.get('/delivery/:id', (req, res)=>{
    DeliveryChallan.find({ 

        'creator': { $in: [ 
        
        mongoose.Types.ObjectId(req.params.id),
        
      
        
        ]} 
        
        }, (err,invoice) => {
         if(!err) {
             res.send(invoice)
         }
    }
)})



router.get('/delivery/:id', (req, res ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

        DeliveryChallan.findById(req.params.id, (err, invoice) => {
        if (!err) { res.send(invoice) }
        else { console.log('update error' + err) }
    });
});


router.put('/delivery/edit/:id',(req, res, ) => {
    DeliveryChallan.findByIdAndUpdate(req.params.id, { $set:{
        customerName:req.body.customerName,
        customerNo:req.body.customerNo,
        customerEmail:req.body.customerEmail,
        challanNo:req.body.challanNo,
        challanDate:req.body.challanDate,
        challanType:req.body.challanType,
   
    } }, { new: true }, (err, invoice) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
})


router.delete('/delivery/:id', (req, res) => {
    DeliveryChallan.findByIdAndRemove( req.params.id ,(err, invoice ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                invoice,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
})

///bills api call

router.post('/bill', (req, res) => {
    console.log(req.body)
    let newBill = new Bill();
    newBill.vendorName = req.body.vendorName;
    newBill.vendorNo = req.body.vendorNo;
    newBill.vendorEmail = req.body.vendorEmail;
    newBill.billNo = req.body.billNo;
    newBill.billDate = req.body.billDate;
    newBill.dueDate = req.body.dueDate;
    newBill.billType = req.body.billType;
    newBill.creator = req.body.userId;
    newBill.save((err, bill) => {
        console.log(bill)
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Bill Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Bill added successfully',
                    bill
                })
            }
        })
        

})


router.get('/bill/:id', (req, res)=>{
    Bill.find({ 

        'creator': { $in: [ 
        
        mongoose.Types.ObjectId(req.params.id),
        
      
        
        ]} 
        
        }, (err,bill) => {
         if(!err) {
             res.send(bill)
         }
    }
)})



router.get('/bill/:id', (req, res ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

        Bill.findById(req.params.id, (err, bill) => {
        if (!err) { res.send(bill) }
        else { console.log('update error' + err) }
    });
});


router.put('/bill/edit/:id',(req, res, ) => {
    Bill.findByIdAndUpdate(req.params.id, { $set:{
        vendorName:req.body.vendorName,
        vendorNo:req.body.vendorNo,
        vendorEmail:req.body.vendorEmail,
        billNo:req.body.billNo,
        billDate:req.body.billDate,
        dueDate:req.body.dueDate,
        billType:req.body.billType,
   
    } }, { new: true }, (err, bill) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
})


router.delete('/bill/:id', (req, res) => {
    Bill.findByIdAndRemove( req.params.id ,(err, bill ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                bill,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
})

///sales api call

router.post('/sales', (req, res) => {
    console.log(req.body)
    let newBill = new Sales();
    newBill.customerName = req.body.customerName;
    newBill.customerNo = req.body.customerNo;
    newBill.customerEmail = req.body.customerEmail;
    newBill.salesOrderNo = req.body.salesOrderNo;
    newBill.salesOrderDate = req.body.salesOrderDate;
    newBill.shipmentDate = req.body.shipmentDate;
    newBill.salesPerson = req.body.salesPerson;
    newBill.creator = req.body.userId;
    newBill.save((err, bill) => {
        console.log(bill)
            if(err) {
                return res.json({
                    success: false,
                    msg: 'Bill Additon failed'
                })
            } else {
                return res.json({
                    success: true,
                    msg: 'Sales ORder added successfully',
                    bill
                })
            }
        })
        

})


router.get('/sales/:id', (req, res)=>{
    Sales.find({ 

        'creator': { $in: [ 
        
        mongoose.Types.ObjectId(req.params.id),
        
      
        
        ]} 
        
        }, (err,sales) => {
         if(!err) {
             res.send(sales)
         }
    }
)})



router.get('/sales/:id', (req, res ) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: 'No customer records found with given id'
        })

        Sales.findById(req.params.id, (err, sales) => {
        if (!err) { res.send(sales) }
        else { console.log('update error' + err) }
    });
});


router.put('/sales/edit/:id',(req, res, ) => {
    Sales.findByIdAndUpdate(req.params.id, { $set:{
        customerName:req.body.customerName,
        customerNo:req.body.customerNo,
        customerEmail:req.body.customerEmail,
        salesOrderNo:req.body.salesOrderNo,
        salesOrderDate:req.body.salesOrderDate,
        salesPerson:req.body.salesPerson,
        billType:req.body.billType,
   
    } }, { new: true }, (err, sales) => {
        if(err)throw err;
        else{
            return res.json({

                success: true,
                msg: ' Updated!!',
            });
           
        }
    })
})


router.delete('/sales/:id', (req, res) => {
    Sales.findByIdAndRemove( req.params.id ,(err, bill ) => {

        if(err) {
            return res.json({

                success: false,
                msg: ' Customer Cant be deleted!!',
            });
        } else{

            return res.json({
                bill,
                success: true,
                msg: ' Deleted!!',
            });

        }
       
      });
})


module.exports = router;