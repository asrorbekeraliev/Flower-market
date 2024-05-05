const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const pgStore = require('connect-pg-simple')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const db = require('./models/index.js')
const pool = require('./config/db.js')


//Initial env variables
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    store: new pgStore({
        pool: pool,
        tableName: 'user_session'
    }),
    secret: 'my secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

//Initialize template engine (handlebars)
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    helpers: {
        // Define and register the compare helper
        compare: (arg1, arg2, options) => {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
          }
    }
}))
app.set('view engine', '.hbs')

// Make the public folder static
app.use(express.static(path.join(__dirname, 'public')))


//Initialize routes
app.use('/product', require('./routes/product.route.js'))
app.use('/auth', require('./routes/auth.route.js'))
app.use('/user', require('./routes/user.route.js'))



const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        const connect = await db.sequelize.sync()
        // const connect = await db.sequelize.sync({force: true})  
        // this line includes: force: true which is used when new table added and associated with an existing table in development mode
        

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })      

    } catch (error) {
        console.log(error)
    }
}

start()