
const { Router } = require('express')
const { getIndexPage,
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

} = require('../controllers/product.controller.js')
const router = Router()

const { protected, guest } = require('../middlewares/auth.js')

const upload = require('../utils/fileUpload.js')


router.get('/index', guest, getIndexPage)
router.get('/add', protected, getProductAddPage)
router.post('/add', upload.single('imageUrl'), protected, productAdd)   // file is named "imageUrl" in the req.file (coming from frontend)
router.get('/all', protected, getAllProductsPage)
router.get('/update/:id', protected, getProductUpdatePage) 
router.post('/update/:id', protected, productUpdate)
router.get('/:id', getSingleProductPage)
router.post('/comment/:id', guest, addCommentToProduct)
router.get('/order/:id', guest, getOrderPage)
router.post('/order/:id', guest, makeProductOrder)
router.get('/orders/all', protected, getAllOrdersPage)
router.post('/order/action/:id', protected, orderAction)
router.post('/sale', protected, addEarnings)

 


module.exports = router