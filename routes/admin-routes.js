const express = require('express');
const { addAdmin, getAdmin, adminLogin } = require('../controllers/admin-controller');
const adminRouter = express.Router();

adminRouter.get('/',getAdmin);
adminRouter.post('/signup',addAdmin); 
adminRouter.post('/login',adminLogin); 

module.exports = adminRouter;