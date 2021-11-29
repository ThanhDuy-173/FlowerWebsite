var bangHoa = require('../models/hoamodel');
module.exports.select = async function (maLoaiHoa) {

    var dshoa = await bangHoa.select(maLoaiHoa);

    var kq = "<table width='100%' align='center' >";
    for (i = 0; i < dshoa.length; i++) {
        if (i % 3 == 0)
            kq = kq + "<tr>";
        kq = kq + "<td><a href='/detail/" + dshoa[i].mahoa + "'><img src='/images/" + dshoa[i].hinh + "'></a><br>Tên hoa :" + dshoa[i].tenhoa + "<br>Giá bán :" + dshoa[i].giaban + "<a href='/muahoa/" + dshoa[i].mahoa + "'><img src='/images/gio_hang.jpg' style='width:25px;height:25px;padding-left:30px'/></a></td>";
        if ((i + 1) % 3 == 0)
            kq = kq + "</tr>";
    }
    kq = kq + "</table";
    return kq;
}

module.exports.selectChitiet = async function (maHoa) {
    var cthoa = await bangHoa.selectCTH(maHoa);
    var kq = "";
    kq = kq + "<table width='50%' align='center' border='1px' style='border-color:red;'>";
    kq = kq + "<tr>";
    kq = kq + "<td style='padding:5px;padding-right:55px'>";
    kq = kq + "<img align='right' src='/images/" + cthoa[0].hinh + "'></td>";
    kq = kq + "<td style='padding-left:30px;'>";
    kq = kq + "<b style='font-size:25px;'>" + cthoa[0].tenhoa + "</b><br><br>";
    kq = kq + "Giá bán: " + cthoa[0].giaban + " VND<br><br>";
    kq = kq + "Thành phần chính: <br>" + cthoa[0].mota + "<br><br>";
    kq = kq + "<a href='/'>Quay về trang chủ</a></td></tr>";
    kq = kq + "</table>";
    return kq;
}

module.exports.selectChitietAdmin = async function (maHoa) {
    var cthoa = await bangHoa.selectCTH(maHoa);
    var kq = "";
    kq = kq + "<table width='50%' align='center' border='1px' style='border-color:red;'>";
    kq = kq + "<>";
    kq = kq + "<td style='padding:5px;padding-right:55px'>";
    kq = kq + "<img align='right' src='/images/" + cthoa[0].hinh + "'></td>";
    kq = kq + "<td style='padding-left:30px;'>";
    kq = kq + "<b style='font-size:25px;'>" + cthoa[0].tenhoa + "</b><br><br>";
    kq = kq + "Giá bán: " + cthoa[0].giaban + " VND<br><br>";
    kq = kq + "Thành phần chính: <br>" + cthoa[0].mota + "<br><br>";
    kq = kq + "<a href='/capnhat/" + cthoa[0].mahoa + "'>Cập nhât</a><br><br>";
    kq = kq + "<a href='/'>Quay về trang chủ</a></td>";
    kq = kq + "<td align='center'><a align='center' onClick='Xoahoa(" + cthoa[0].mahoa + ")'><img align='center' src='/images/delete.jpg' style='width:25px;height:25px;'/></a><br><br></td></tr>"
    kq = kq + "</table>";
    return kq;
}

module.exports.selectFind = async function (tenHoa) {

    var dshoa = await bangHoa.search(tenHoa);

    var kq = "<table width='100%' align='center' >";
    for (i = 0; i < dshoa.length; i++) {
        if (i % 2 == 0)
            kq = kq + "<tr>";
        kq = kq + "<td width='50%'><table width='100%'><tr>";
        kq = kq + "<td><a href='/detail/" + dshoa[i].mahoa + "'><img src='/images/" + dshoa[i].hinh + "'></a></td><td>Tên hoa :" + dshoa[i].tenhoa + "<br>Giá bán :" + dshoa[i].giaban + "<br>Mô Tả :" + dshoa[i].mota + "<br><a href='/" + dshoa[i].maloai + "'>Về Trang Chủ</a></td></tr></table></td>";
        if ((i + 1) % 2 == 0)
            kq = kq + "</tr>";
    }
    if (dshoa.length == 0) {
        if (tenHoa != "None")
            kq = kq + "<tr><td>Không có kết quả cho tên " + tenHoa + "</td></tr>";
        else
            kq = kq + "<tr><td>Không có kết quả để hiển thị! Mời bạn nhập tên hoa vào ô tìm kiếm...</td></tr>";
    }
    kq = kq + "</table";
    return kq;
}

module.exports.selectByCode = async function (mahoa) {
    var dshoa = await bangHoa.selectCTH(mahoa);
    if (dshoa.length > 0) {
        return dshoa[0];
    }
    return '';
}

module.exports.insert = async function (newHoa) {
    createdHoa = await bangHoa.insert(newHoa);
    return createdHoa;
}

module.exports.update = async function (mahoa, data) {
    updateHoa = await bangHoa.update(mahoa, data);
    return updateHoa;
}

module.exports.delete = async function (xoaHoa) {
    deletedHoa = await bangHoa.delete(xoaHoa);
    return deletedHoa;
}