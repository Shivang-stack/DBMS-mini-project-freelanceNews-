const express = require("express")
const router = express.Router();

const {getArticleById, createArticle} = require("../../backend/controllers/article")
const { isAuthenticated, isSignedIn} = require("../../backend/controllers/auth")
const {getUserById} = require("../../backend/controllers/user")

router.param("userId", getUserById);
router.param("artileId", getArticleById);


router.post("/article/create/:userId", isSignedIn, isAuthenticated, createArticle);


module.exports = router;