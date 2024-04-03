const { Router }  = require('express');

const authRoutes = require('./auth.routes.js')
const productRoutes = require('./product.routes.js')

const routes = Router();


routes.use('/auth', authRoutes);
routes.use('/product', productRoutes);


module.exports = routes;