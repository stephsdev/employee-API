const express = require('express');
const employeeControllers = require('../controllers/employee-controller')
const router = express.Router();


// @route GET & POST 
router.route("/").get(employeeControllers.getAllEmployees).post(employeeControllers.insertNewEmployee);

// get employee by email
router.route("/:email").get(employeeControllers.getEmployee).patch(employeeControllers.updateEmployee).delete(employeeControllers.deleteEmployee);

// @route PATCH update employee property
// router.route("/:email/:property")

module.exports = router;