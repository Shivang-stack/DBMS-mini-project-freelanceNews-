var express = require('express')
var router = express.Router()
const {check} = require('express-validator')
const {signout, userSignup, userSignin, adminSignup, adminSignin} =require("../controllers/auth")


router.post("/user/signup",[
    check("firstname","firstname should be at least 3 char").isLength({min: 3}),
    check("lastname","lastname should be at least 3 char").isLength({min: 3}),
    check("phoneno","phone no should be 10 digit").isLength({min: 10}),
    check("email","Invalid Email").isEmail(),
    check("password","name should be at least 5 char").isLength({min: 5})
], userSignup);

router.post("/user/signin",[
    check("email","Invalid Email").isEmail(),
    check("password","name should be at least 5 char").isLength({min: 5})
], userSignin);

router.post("/admin/signup",[
    check("firstname","firstname should be at least 3 char").isLength({min: 3}),
    check("lastname","lastname should be at least 3 char").isLength({min: 3}),
    check("phoneno","phone no should be 10 digit").isLength({min: 10}),
    check("email","Invalid Email").isEmail(),
    check("password","name should be at least 5 char").isLength({min: 5})
], adminSignup);

router.post("/admin/signin",[
    check("email","Invalid Email").isEmail(),
    check("password","name should be at least 5 char").isLength({min: 5})
], adminSignin);


router.get("/signout", signout );

module.exports =router;