const express = require('express')
const router = express.Router()

const controller = require('../controller/service-agent')
const Auth = require('../middleware/service-agent')

router.post('/login', controller.login)
router.post('/record',Auth, controller.createRecord)
router.patch('/edit/:id',Auth, controller.editRecord)
router.delete('/delete/:id',Auth, controller.deleteRecord)
router.get('/daily',Auth, controller.seeDailyAppointments)
router.get('/past',Auth, controller.showPastAppointment)
router.post('/decision',Auth, controller.appointmentStatus)

module.exports = router