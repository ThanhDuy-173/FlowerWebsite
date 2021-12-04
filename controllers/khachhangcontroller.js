var bangkhachhang = require('../models/khachhangmodel');
module.exports.login = async function (tendn, matkhau) {
    var dskh = await bangkhachhang.select({
        tendn:  tendn.toString(),
        matkhau: matkhau.toString()
    });
    if (dskh.length > 0)
        return dskh[0];
    return "";
}
module.exports.insert = async function (newKhachHang) {
    createKH = await bangkhachhang.insert(newKhachHang);
    return createKH;
}