var mongoose = require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    maloai: String,
    tenloai: String,
});
userTable = mongoose.model('loaihoa', userSchema);
module.exports.select = async function () {
    var userData = await userTable.find({});
    //console.log(userData);
    return userData;
}
module.exports.insert = async function (newLoaiHoa) {
    const h = new userTable({
        maloai: newLoaiHoa.maloai,
        tenloai: newLoaiHoa.tenloai
    });
    var b = await userTable.find({});
    for (i = 0; i < b.length; i++) {
        if (b[i].maloai === newLoaiHoa.maloai) {
            return;
        }
    }
    var userData = await h.save();
    return userData;
}

module.exports.delete = async function (xoaLoaiHoa) {
    var d = userTable.find({
        maloai: xoaLoaiHoa
    }).remove().exec();
    return d;
}