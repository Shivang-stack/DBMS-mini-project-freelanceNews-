const User = require("../models/user");
const  Article= require("../models/article");

exports.getUserById= (req, res, next , id) => {
    User.findById(id).exec((err, user)=>{
        if(err|| !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user
        next();
    });
};

exports.getUser= (req, res) => {
    //TO DO get here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt =undefined;
    req.profile.updatedAt =undefined;
    return res.status(400).json(req.profile)
};

exports.getAllUsers = (req, res) =>{
    User.find().exec((err, users)=>{
        if(err|| !users){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        users.salt = undefined;
        users.encry_password = undefined;
        users.createdAt =undefined;
        users.updatedAt =undefined;
        res.json(users)
    })
}

exports.updateUser= (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) =>{
            if(err){
                return res.status(400).json({
                    error:"Update not successful"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt =undefined;
            user.updatedAt =undefined;
            res.json(user)
        }
    )
};


exports.userArticleList = (req, res) => {
    Article.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, Article)=>{
        if(err){
            return res.status(400).json({
                error:"No Article in this account"
            })
        }
        return res.json(Article);
    })
}

