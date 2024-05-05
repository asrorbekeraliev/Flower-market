
const { Router } = require('express')
const { 
    getDashboardPage
} = require('../controllers/user.controller.js')
const router = Router()

const { protected, guest } = require('../middlewares/auth.js')

router.get('/dashboard', protected, getDashboardPage)

module.exports = router