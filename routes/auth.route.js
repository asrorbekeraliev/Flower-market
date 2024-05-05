
const { Router } = require('express')
const { getRegisterPage,
    getLoginPage,
    RegisterUser,
    loginUser,
    logout
} = require('../controllers/auth.controller.js')
const router = Router()

const { protected, guest } = require('../middlewares/auth.js')


router.get('/registration', guest, getRegisterPage)
router.post('/registration', guest, RegisterUser)
router.get('/login', guest, getLoginPage)
router.post('/login', guest, loginUser)
router.get('/logout', protected, logout)

module.exports = router