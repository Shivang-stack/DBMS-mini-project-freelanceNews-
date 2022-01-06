var mongoose = require('mongoose');

var categorySchema = new  mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        maxlength:32,
        trim: true
    },
}, {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema)