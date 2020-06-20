
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const suplierControl = require('../controllers/supliers')

router.post('',checkAuth, suplierControl.addSupliers)


router.get('',checkAuth, suplierControl.getSupliersByCreator)



router.get('/:id',checkAuth, suplierControl.getSuplierById);


router.put('/edit/:id' ,checkAuth, suplierControl.updateSuplier)


router.delete('/:id',checkAuth, suplierControl.deleteSuplier)


module.exports = router;