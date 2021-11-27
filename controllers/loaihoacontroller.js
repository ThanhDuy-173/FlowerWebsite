var bangLoaiHoa = require('../models/loaihoamodel');
module.exports.select = async function (req, res) {
    var data = await bangLoaiHoa.select();
    // res.render('mhloaihoa', {
    //     userData: data
    // });
    return data;
}

module.exports.selectLH = async function () {
    var data = await bangLoaiHoa.select();
    var kq = "";
    for (i = 0; i < data.length; i++) {
        kq = kq + "<a href='/" + data[i].maloai + "'>" + data[i].tenloai + "</a><br>";
    }
    return kq;
}

module.exports.showCombo = async function (req, res) {
    var dsloaihoa = await bangLoaiHoa.select();
    var kq = "";
    for (i = 0; i < dsloaihoa.length; i++) {
        kq = kq + "<option value='" + dsloaihoa[i].maloai + "'>" + dsloaihoa[i].tenloai + "</option>";
    }
    return kq;
}

module.exports.insert = async function (newLoaiHoa) {
    createdLoaiHoa = await bangLoaiHoa.insert(newLoaiHoa);
    return createdLoaiHoa;
}

module.exports.delete = async function (xoaLoaiHoa) {
    deletedLoaiHoa = await bangLoaiHoa.delete(xoaLoaiHoa);
    return deletedLoaiHoa;
}