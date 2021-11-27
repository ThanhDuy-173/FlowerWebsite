var mongoose = require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    tendn: String,
    matkhau: String,
    hoten: String,
    diachi: String,
    dienthoai: String,
    email: String,
    role: String,
});
userTableKH = mongoose.model('khachhang', userSchema);
module.exports.select = async function (query) {
    var userData = await userTableKH.find(query);
    //console.log(query);
    return userData;
}
module.exports.insert = async function (newKhachHang) {
    const kh = new userTableKH({
        tendn: newKhachHang.tendn,
        matkhau: newKhachHang.matkhau,
        hoten: newKhachHang.hoten,
        diachi: newKhachHang.diachi,
        dienthoai: newKhachHang.dienthoai,
        email: newKhachHang.email,
        role: newKhachHang.role,
    });
    var userData = await kh.save();
    return userData;
}