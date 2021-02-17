const express = require('express')
const router = express.Router()

const controller = require('../controller/customer')
const Auth = require('../middleware/customer')

router.post('/signup', controller.registor)
router.post('/login', controller.login)
router.post('/vehicle',Auth, controller.addVehicle)
router.patch('/edit/:id',Auth, controller.editVehicle)
router.delete('/delete/:id',Auth, controller.deleteVehicle)
router.post('/appointment',Auth, controller.createAppointment)
router.get('/view-service',Auth, controller.viewServiceRecords)
router.post('/payment',Auth, controller.payment)

module.exports = router

