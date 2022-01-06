const Article = require("../models/article")
const formidable = require("formidable")
const _= require("lodash")
const fs = require("fs");

exports.getArticleById =(req, res , next , id) =>{
    Article.findById(id)
    .populate("category")
    .exec((err, article)=>{
        if(err){
            return res.status(400).json({
                error: "Article not found"
            })
        }
        req.article = article;
        next();
    })
}

exports.createArticle = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions= true;

    form.parse(req,(err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //TODO: restriction on field
        let article = new Article(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: " file size too big"
                })
            }
            article.photo.data = fs.readFileSync(file.photo.path)
            article.photo.contentType = file.photo.type
        
        }

        //Save to DB
        article.save((err, article)=>{
            if(err){
                res.status(400).json({
                    error: "saving article in db failed"
                })
            }
            res.json(article)
        })
    });
};