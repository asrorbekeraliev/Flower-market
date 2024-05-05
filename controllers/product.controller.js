const { raw } = require('express')
const db = require('../models/index.js')
const { where } = require('sequelize')
const Product = db.product
const Comment = db.comment
const Order = db.order
const Earnings = db.earnings

// Desc:    Get index page
// Route:   GET /product/index
// Access:  Public

const getIndexPage = async (req, res) => {
    try {
        const products = await Product.findAll({
            raw: true,
        })
        res.render('product/index.hbs', {
            title: 'Index Page',
            products: products.reverse()
        })        
    } catch (error) {
        console.log(error)
    } 
}

// Desc:    Get all products page
// Route:   GET /product/all
// Access:  Public

const getAllProductsPage = async (req, res) => {
    try {
        const products = await Product.findAll({
            raw: true,
        })
        // console.log(req.session.isLogged)
        res.render('product/all-products.hbs', {
            title: 'All products',
            products: products.reverse(),
            isAuthenticated: req.session.isLogged
        })        
    } catch (error) {
        console.log(error)
    } 
}

// Desc: Get product add page
// Route: GET /product/add
// Access: Private

const getProductAddPage = (req, res) => {
    try {
        res.render('product/add-product.hbs', {
            title: 'Add new product',
            isAuthenticated: req.session.isLogged,
            errorMessage: req.flash('f-error')
        })
        
    } catch (error) {
        console.log(error)
    }
}


// Desc: Product add 
// Route: POST /product/add
// Access: Private
const productAdd = async (req, res) => {
    try {
        const { title, description, amount } = req.body
        // console.log(req.file)
        // console.log(req.session.user.id)
        if(title == '' || description == '' || amount == ''){
            req.flash('f-error', 'Product title / description / amount is empty')
            return res.redirect('/product/add')
        }
        // check if file is coming in req.file. If yes fileUrl will be '/upload/'+req.file.filename , otherwise empty string
        const fileUrl = req.file ? '/uploads/' + req.file.filename : ''
        
        await Product.create({
            image: fileUrl,
            title: title,
            description: description,
            amount: parseInt(amount),
            userId: req.session.user.id,
        })        
        res.redirect('/product/add')
    } catch (error) {
        console.log(error)
    }
}

// Desc: Get Product update page
// Route: GET /product/update/:id
// Access: Private
const getProductUpdatePage = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            raw: true
        })
        res.render('product/product-update.hbs', {
            title: 'Update Product info',
            productId: product.id,
            productTitle: product.title,
            productDescription: product.description,
            productAmount: product.amount,
            isAuthenticated: req.session.isLogged,
            errorMessage: req.flash('f-error')
        })
    } catch (error) {
        console.log(error)
    }
}

// Desc: Product update
// Route: POST /product/update/:id
// Access: Private
const productUpdate = async (req, res) => {
    try {
        if(req.body.title == '' || req.body.description == '' || req.body.amount == ''){
            req.flash('f-error', 'Please, fil all the input areas')
            return res.redirect('/product/update/' + req.params.id)
        }
        await Product.update({title: req.body.title, description: req.body.description, amount: req.body.amount}, {
            where: {id: req.params.id}
        })
        res.redirect('/product/all')
    } catch (error) {
        console.log(error)
    }
}

// Desc: Get single product page
// Route: GET /product/:id
// Access: Private
const getSingleProductPage = async (req, res) => {
    try {
        const data = await Product.findByPk(req.params.id, {
            raw: false,
            include: ['comments'],
            nest: true,
            plain: true
        })
        const product = data.toJSON()
        // console.log(product.comments)
        const status = req.session.status
        delete req.session.status
        res.render('product/one-product.hbs', {
            title: 'Update Product info',
            productId: product.id,
            productTitle: product.title.toUpperCase(),
            productDescription: product.description,
            productImageUrl: product.image,
            productUpdatedAt: product.updatedAt,
            productAmount: product.amount,
            isAuthenticated: req.session.isLogged,
            errorMessage: req.flash('f-error'),
            comments: product.comments,
            status: status
        })
    } catch (error) {
        console.log(error)
    }
}

// Desc: Add comment to the product
// Route: POST /product/comment/:id
// Access: Private
const addCommentToProduct = async (req, res) => {
    try {
        if(req.body.comment === ''){
            req.flash('f-error', 'Empty comment cannot be added')
            return res.redirect('/product/' + req.params.id)
        }
        if(req.body.email === ''){
            req.flash('f-error', 'Comment cannot be added without email')
            return res.redirect('/product/' + req.params.id)
        }
        await Comment.create({
            email: req.body.email,
            text: req.body.comment,
            productId: req.params.id
        })
        res.redirect('/product/' + req.params.id)
    } catch (error) {
        console.log(error)
    }
}

// Desc: Get order page
// Route: GET /product/order/:id
// Access: Public
const getOrderPage = (req, res) => {
    try {
        res.render('product/product-order.hbs', {
            title: 'Product Order Page',
            productId: req.params.id,
        })
    } catch (error) {
        console.log(error)
    }
}

// Desc: Make order
// Route: POST /product/order/:id
// Access: Public
const makeProductOrder = async (req, res) => {
    try {
        if(req.body.fullname === '' || req.body.phoneNumber === ''){
            req.flash('f-error', 'Please fill all the fields')
            return res.redirect('/product/order/' + req.params.id)
        }
        console.log(req.body)
        await Order.create({
            full_name: req.body.fullname,
            region: req.body.region,
            phone: req.body.phoneNumber,
            status: 'pending',
            productId: req.params.id
        })        
        req.session.status = true
        res.redirect('/product/' + req.params.id)
    } catch (error) {
        console.log(error)
    }
}


// Desc: Get all orders page
// Route: GET /product/orders/all
// Access: Private
const getAllOrdersPage = async (req, res) => {
    try {        
        const orders = await Order.findAll({
            raw: true,
            include: ['product'],
            nest: true
        })
        res.render('product/all-orders.hbs', {
            title: 'All Orders Page',
            isAuthenticated: req.session.isLogged,
            orders: orders.reverse(),
        })
    } catch (error) {
        console.log(error)
    }
}

// Desc: Make action on order
// Route: POST /product/order/action/:id
// Access: Private
const orderAction = async (req, res) => {
    try {        
        await Order.update({status: req.body.action}, {
            where: {id: req.params.id}
        })
        const product = await Product.findByPk(req.body.productId, {
            raw: true
        })
        if (req.body.action === 'sold') {
            await Product.update({amount: parseInt(product.amount) - 1}, {
                where: {id: product.id}
            })
        }
        res.redirect('/user/dashboard')
    } catch (error) {
        
    }
}

// Desc: Add a sale earnings to update total earnings
// Route: POST /product/sale
// Access: Private
const addEarnings = async (req, res) => {
    try {     
        const lastEarnings = await Earnings.findAll({
            raw: true
        })
        const earnings = lastEarnings[0].amount + parseInt(req.body.earnings)
        await Earnings.update({amount: earnings}, {where: {id: lastEarnings[0].id}})        
        res.redirect('/user/dashboard')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getIndexPage,
    getProductAddPage,
    productAdd,
    getAllProductsPage,
    getProductUpdatePage,
    productUpdate,
    getSingleProductPage,
    addCommentToProduct,
    getOrderPage,
    makeProductOrder,
    getAllOrdersPage,
    orderAction,
    addEarnings
}