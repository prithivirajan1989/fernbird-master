const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const PurchaseControl = require('../controllers/purchases')
router.post('',checkAuth, PurchaseControl.createPurchases )


router.get('',checkAuth, PurchaseControl.getPurchasesByCreator)



router.get('/:id',checkAuth, PurchaseControl.getPurchaseById);


router.put('/edit/:id',checkAuth,PurchaseControl.updatePurchase)


router.delete('/:id',checkAuth,PurchaseControl.deletePurchase )

module.exports = router;