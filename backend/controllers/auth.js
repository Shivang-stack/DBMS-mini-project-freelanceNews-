const User =require("../models/user")
const {validationResult} = require('express-validator')
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const Admin = require("../models/admin");

exports.userSignup = (req, res)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user =new User(req.body)
    user.save((err, user)=> {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            });
        }
        else{
            res.json({
                id: user._id,
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                phoneno: user.phoneno
            });
        }
    });
    
};

exports.adminSignup = (req, res)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const admin =new Admin(req.body)
    admin.save((err, admin)=> {
        if(err){
            return res.status(400).json({
                err: "Not able to save admin in DB"
            });
        }
        else{
            res.json({
                id: admin._id,
                name: `${admin.firstname} ${admin.lastname}`,
                email: admin.email,
                phoneno: admin.phoneno
            });
        }
    });
    
};

exports.userSignin =(req, res)=>{
    const{email , password}= req.body;

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err, user)=>{
        if(err || !user ){
           return res.status(400).json({
                error: "User email doesn't exists"
            })
        }

        if(!user.autheticate(password)){
           return res.status(401).json({
                error:"Email and password do not match"
            })
        }
        //Create token
        const token= jwt.sign({_id: user._id}, process.env.SECRET)

        //put token in cookie
        res.cookie("token", {expire: new Date() + 9999});

        //sent response to frontend
        const {_id, name, email, role}= user;
        return res.json({token, user:{_id, name, email , role}});
    });
};

exports.adminSignin =(req, res)=>{
    const{email , password}= req.body;

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    Admin.findOne({email},(err, admin)=>{
        if(err || !admin ){
           return res.status(400).json({
                error: "Admin email doesn't exists"
            })
        }

        if(!admin.autheticate(password)){
           return res.status(401).json({
                error:"Email and password do not match"
            })
        }
        //Create token
        const token= jwt.sign({_id: admin._id}, process.env.SECRET)

        //put token in cookie
        res.cookie("token", {expire: new Date() + 9999});

        //sent response to frontend
        const {_id, name, email, role}= admin;
        return res.json({token, admin:{_id, name, email , role}});
    });
};


exports.signout = (req, res)=>{
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['RS256']
});

//custom middlewares
exports.isAuthenticated = (req, res, next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) =>{
    if(req.profile.role === 0 || req.profile.role === 2){
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
};