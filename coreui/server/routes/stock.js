const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const stocksControl = require("../controllers/stocks");

router.post('',checkAuth, stocksControl.createStock )


router.get('',checkAuth , stocksControl.getStocksByCreator )



router.get('/:id', checkAuth,  stocksControl.getStockById);


router.put('/edit/:id',checkAuth,  stocksControl.updateStock)


router.delete('/:id',checkAuth, stocksControl.deleteStock )


module.exports = router;