var mongoose = require('mongoose');
var db = require('../database');
var userSchema = new mongoose.Schema({
    mahoa: String,
    maloai: String,
    tenhoa: String,
    giaban: String,
    hinh: String,
    mota: String,
});
userTableHoa = mongoose.model('hoa', userSchema);

module.exports.select = async function (maLoai) {
    var userData = await userTableHoa.find({
        maloai: maLoai
    });
    if (maLoai == "All") userData = await userTableHoa.find({});
    //console.log(userData);
    return userData;
}

module.exports.selectCTH = async function (maHoa) {
    var userData = await userTableHoa.find({
        mahoa: maHoa
    });
    //console.log(userData);
    return userData;
}

module.exports.search = async function (tenHoa) {
    var userData = await userTableHoa.find({
        $or: [{
            tenhoa: new RegExp(tenHoa, 'i'),
        }, {
            mota: new RegExp(tenHoa, 'i'),
        }]
    });
    return userData;
}

module.exports.insert = async function (newHoa) {
    var bangHoa = await userTableHoa.find().sort({
        mahoa: 1
    });
    var mahoa = 1;
    if (bangHoa.length > 0) {
        console.log(mahoa);
        mahoa = mahoa + bangHoa.length * 1;
    }
    const h = new userTableHoa({
        mahoa: mahoa,
        tenhoa: newHoa.tenhoa,
        maloai: newHoa.maloai,
        hinh: newHoa.hinh,
        giaban: newHoa.giaban,
        mota: newHoa.mota
    });
    var userData = await h.save();
    return userData;
}

module.exports.delete = async function (xoaHoa) {
    var d = await userTableHoa.find({
        mahoa: xoaHoa
    }).remove().exec();
    return d;
}