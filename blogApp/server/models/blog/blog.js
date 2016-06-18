var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining the mongoose schema for Movie collection
var blogSchema   = new Schema({
    Title: String,
    ShortDes:String,
    LongDes:String,
    Username:String,
    Poster:String,
    writtenDate:Date,
});

module.exports = mongoose.model('Blog', blogSchema,'blogCollection');
