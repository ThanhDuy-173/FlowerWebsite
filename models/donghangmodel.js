var mongoose = require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    sodh: Number,
    hoten: String,
    diachi: String,
    dienthoai: Number,
    email: String,
    dsmh: [{
        mahoa: String,
        tenhoa: String,
        soluong: Number,
        dongia: Number,
        thanhtien: Number
    }],
    //dsmh: {type: Array, "default": []}
});
userTableDonHang = mongoose.model('donhang', userSchema);

module.exports.select = async function (query) {
    var userData = await userTableDonHang.find(query);
    return userData;
}

module.exports.insert = async function (newDonHang) {
    var bangDonHang = await userTableDonHang.find().sort({
        sodh: 1
    }).limit(1);
    var sodh = 1;
    if (bangDonHang.length > 0) {
        sodh = sodh + bangDonHang[0].sodh;
    }
    const donhang = new userTableDonHang({
        sodh: sodh,
        hoten: newDonHang.hoten,
        diachi: newDonHang.diachi,
        dienthoai: newDonHang.dienthoai,
        email: newDonHang.email,
        dsmh: newDonHang.dsmh,
    });
    var userData = await donhang.save();
    return userData;
}