const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers.js')

//User Routes
router.put("/user/:user_name",UserController.registerUser)
router.get("/user/:user_name",UserController.getUser)


module.exports = router;

