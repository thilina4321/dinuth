const express = require('express')
const router = express.Router()

const controller = require('../controller/super-admin')
const Auth = require('../middleware/super-admin')

router.post('/signup', controller.registor)
router.post('/login', controller.login)

router.post('/customer-add',Auth, controller.addCustomer)
router.patch('/customer-edit',Auth, controller.editCustomer)
router.patch('/customer',Auth, controller.showCustomer)

router.post('/vehicles-add',Auth, controller.addVehicle)
router.get('/vehicles',Auth, controller.getVehicles)
router.patch('/vehicles/:id',Auth, controller.editVehicle)

router.get('/records',Auth, controller.getServiceRecords)

router.post('/agent',Auth, controller.serviceAgent)
router.post('/appointments',Auth, controller.showAppointment)
router.post('/payments',Auth, controller.showPayment)

module.exports = router