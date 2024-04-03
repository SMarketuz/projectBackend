const { Router }  = require('express');

const authController = require('../controller/auth.controller')

const authRoutes = Router();


authRoutes.post('/login', authController.login);
authRoutes.get('/logout', authController.logout);
authRoutes.get('/refresh', authController.refresh)


module.exports = authRoutes;