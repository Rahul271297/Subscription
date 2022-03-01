const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers.js')
const SubscriptionController = require('../controllers/subscriptionController.js')

//User Routes
router.put("/user/:user_name",UserController.registerUser)
router.get("/user/:user_name",UserController.getUser)
//Subscription routes
router.post("/subscription",SubscriptionController.newSubs)
router.get("/subscription/:user_name",SubscriptionController.getSubs)
module.exports = router;

