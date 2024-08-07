const express = require("express")
const router = express.Router()
const ShopController = require('../controllers/ShopController')

router.get('/getProduct/:productId', ShopController.getProduct)
router.get('/allProducts', ShopController.allProducts)
router.get('/', ShopController.index)
router.get('/:productId', ShopController.show)
router.post('/store', ShopController.store)
router.post('/update/:product', ShopController.update)
router.post('/delete', ShopController.deleteProduct)


module.exports = router