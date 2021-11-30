const { Timestamp } = require('bson');
var mongoose = require('mongoose');
var db = require('../database');
const sanitizeHtml = require('sanitize-html');
var userSchema = new mongoose.Schema({
    comment: String,
    user: String,
    mahoa: String,
},{timestamps: true});
cmtTable = mongoose.model('comment', userSchema);

module.exports.select = async function(mahoa){
    const cmts= await cmtTable.find({mahoa: mahoa});
    return cmts;
}

module.exports.add = async function(cmt){
    console.log("dirty",cmt.comment);
    console.log
    var clean = sanitizeHtml(cmt.comment);
    clean = encodeURI(clean); 
    console.log("clean",clean);
    
    if (clean=="") return 0;
    const newcmt = new cmtTable({mahoa: cmt.mahoa, user: cmt.user, comment: clean});
    const x = await newcmt.save();
    return x;
    
}