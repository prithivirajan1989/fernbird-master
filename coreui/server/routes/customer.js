const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const CustomerControl = require("../controllers/customers");

// Add New Customers
router.post("", checkAuth, CustomerControl.addCustomers);

// get Customers with Creator Id

router.get("", checkAuth, CustomerControl.getCustomerByCreator);

// get customer by customer Id

router.get("/:id", checkAuth, CustomerControl.getCustomerById);

// update Customer by id
router.put("/edit/:id", checkAuth, CustomerControl.updateCustomer);

// delete Customer by id

router.delete("/:id", checkAuth, CustomerControl.deleteCustomer);

module.exports = router;