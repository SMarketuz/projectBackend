const { Router }  = require('express');

const productController = require('../controller/product.controller');
const multer = require('../utils/multer');

const productRoutes = Router();


productRoutes.post('/add', multer.single('image'), productController.addProduct);
productRoutes.get('/all/:id', productController.getProduct);
productRoutes.get('/all', productController.getProducts);
productRoutes.patch('/update/:id', productController.updateProduct);
productRoutes.delete('/del/:id', productController.delProduct);



module.exports = productRoutes;