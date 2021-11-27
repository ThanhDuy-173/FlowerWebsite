var bangDonHang = require('../models/donghangmodel');

module.exports.select = async function (sodh) {
    var dsDonHang = await bangDonHang.select({
        sodh: sodh
    });
    dsmh = dsDonHang.dsmh;
    return dsmh;
}

module.exports.insert = async function (dh) {
    createDH = await bangDonHang.insert(dh);
    return createDH;
}