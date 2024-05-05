const { raw } = require('express');
const db = require('../models/index.js')
const User = db.user
const Product = db.product
const Order = db.order
const Earnings = db.earnings

// Desc:    User Dashboard Page
// Route:   GET /user/dashboard
// Access:  Private
const getDashboardPage = async (req, res) => {
    try {
        const allProducts = await Product.findAll({
            raw: true
        });
        
        let totalNumberOfProducts = 0;
        for(i=0; i<allProducts.length; i++){
            totalNumberOfProducts += parseInt(allProducts[i].amount)
        }
        const statusList = await Order.findAll({
            raw: true,
            attributes: ['status']
        })
        let pendingOrders = 0
        for(i=0; i<statusList.length; i++){
            if(statusList[i].status == 'pending'){
                pendingOrders += 1;
            }
        }
        const earnings = await Earnings.findAll({raw: true})
        totalEarnings = parseInt(earnings[0].amount)
        res.render('user/dashboard.hbs', {
            title: 'Dashboard Page',
            isAuthenticated: req.session.isLogged,
            allProducts: allProducts,
            totalNumberOfProducts: totalNumberOfProducts,
            pendingOrders: pendingOrders,
            totalEarnings: totalEarnings
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getDashboardPage
}