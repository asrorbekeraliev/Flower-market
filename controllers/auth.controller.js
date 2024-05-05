const db = require('../models/index.js')
const bcrypt = require('bcryptjs')
const User = db.user

// Desc:    User Registration Page
// Route:   GET /auth/registration
// Access:  Public
const getRegisterPage = async (req, res) => {
    try {
        res.render('auth/registration.hbs', {
            title: 'Register Page',
        })
    } catch (error) {
        console.log(error)
    }
}


// Desc:    User Registration
// Route:   POST /auth/registration
// Access:  Public
const RegisterUser = async (req, res) => {
    try {
        const {email, firstName, lastName, password, password2} = req.body
        if (password !== password2) {
            req.flash('f-error', 'You entered different passwords') // create flash error message named f-error
            return res.redirect('/auth/registration')
        }
        const userExist = await User.findOne({where: { email: email}})
        if(userExist){
            req.flash('f-error', 'The entered email has been already registered in the system') // create flash error message named f-error
            return res.redirect('/auth/registration')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword
        })
        res.redirect('/auth/login')


    } catch (error) {
        console.log(error)
    }
}


// Desc:    User Registration Page
// Route:   GET /auth/login
// Access:  Public
const getLoginPage = async (req, res) => {
    try {
        res.render('auth/login.hbs', {
            title: 'Login Page',
        })
    } catch (error) {
        console.log(error)
    }
}


// Desc:    Login user
// Route:   POST /auth/login
// Access:  Public

const loginUser = async (req, res) => {
    try {
        const userExist = await User.findOne({where: {email: req.body.email}})
        if(userExist){
            const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
            if(matchPassword){
                req.session.isLogged = true
                req.session.user = userExist
                req.session.save(err => {
                    if(err) throw err
                    return res.redirect('/user/dashboard')
                })
            }
            else{
                req.flash('f-error', 'You entered wrong email or password') // create flash error message named f-error
                res.redirect('/auth/login')
            }
        }
        else{
            req.flash('f-error', 'You entered wrong email or password') // create flash error message named f-error
            res.redirect('/auth/login')
            
        }
             
    } catch (error) {
        console.log(error)
    }    
}

// Desc:    Logout user
// Route:   GET /auth/logout
// Access:  Private
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
}


module.exports = {
    getRegisterPage,
    getLoginPage,
    RegisterUser,
    loginUser,
    logout
}