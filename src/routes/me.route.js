const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.get('/stored/course', meController.show)
router.get('/trash/course', meController.trash)


module.exports = router 