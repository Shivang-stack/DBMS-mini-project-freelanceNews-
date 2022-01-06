const express = require('express')
const router = express.Router()

const {getUserById, getUser, getAllUsers, updateUser, userArticleList}= require("../../backend/controllers/user")
const { isSignedIn, isAuthenticated }= require("../../backend/controllers/auth")

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users", getAllUsers);

router.put("/user/update/:userId",isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId",isSignedIn, isAuthenticated, userArticleList);

module.exports = router;