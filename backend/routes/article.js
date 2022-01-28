const express = require("express")
const router = express.Router();

const {getArticleById, createArticle, removeArticle} = require("../../backend/controllers/article")
const { isAuthenticated, isSignedIn, isAdmin} = require("../../backend/controllers/auth")
const {getUserById} = require("../../backend/controllers/user")

router.param("userId", getUserById);
router.param("artileId", getArticleById);


router.post(
    "/article/create/:userId", 
    isSignedIn, 
    isAuthenticated, 
    createArticle
);

//delete
router.delete(
    "/article/:articleId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeArticle
);


module.exports = router;