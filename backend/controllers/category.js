const Category = require("../models/category")


exports.getCategoryById = (res, req, next, id) =>{
    Category.findById(id).exec((err, cate)=>{
        if(err){
            return res.status(400).json({
                error: "Category not found"
            });
        }
        res.category = cate;
        next();
    });
}

exports.createCategory = (req, res) =>{
    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to Save Category"
            });
        }
        res.json({category});
    });
};

exports.getCategory = (req, res) =>{
    return res.json(req.category);
};

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to find  Category"
            });
        }
        res.json({categories});
    });
};

exports.updateCategory = (req, res) =>{
    const category = req.category;
    category.categoryname = req.body.categoryname;
    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to Update Category"
            });
        }
        res.json({updatedCategory});
    });
};

exports.removeCategory = (req, res) =>{
    const category = req.category;
    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to delete Category"
            });
        }
        res.json({
            message: "Successfully Deleted"
        });
    });
};
