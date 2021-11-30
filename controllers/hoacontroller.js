var bangHoa = require('../models/hoamodel');
var bangCMT = require('../models/binhluanmodel')
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
    var comments = await bangCMT.select(maHoa)
    var kq = "";
    kq = kq + "<div class='stylexx'><table width='50%' align='left' border='1px' style='border-color:red;'>";
    kq = kq + "<tr>";
    kq = kq + "<td style='padding:5px;padding-right:55px'>";
    kq = kq + "<img align='right' src='/images/" + cthoa[0].hinh + "'></td>";
    kq = kq + "<td style='padding-left:30px;'>";
    kq = kq + "<b style='font-size:25px;'>" + cthoa[0].tenhoa + "</b><br><br>";
    kq = kq + "Giá bán: " + cthoa[0].giaban + " VND<br><br>";
    kq = kq + "Thành phần chính: <br>" + cthoa[0].mota + "<br><br>";
    kq = kq + "<a href='/'>Quay về trang chủ</a></td></tr>";
    kq = kq + "</table>";
    kq = kq + "<div class='cmt-container'>";
    kq = kq + "<form id='formx' name='formx' method='post' action='/comments/"+cthoa[0].mahoa+"'>"
    kq = kq + "<span>COMMENTS</span>";
    kq = kq + "<table width='100%' border='0' cellpadding='0' cellspacing='2'>"
    kq = kq + "<tr><td width='80%'><input name='cmt' type='text' id='cmt' size='15' class='cmt-input'/></td> <td width='20%'> <input type='submit' name='Submit' value='Gửi' class='summit-bnt'/></td></tr>"
    kq = kq + "<tr><td width='80%'></td><td width='20%'><b></b></td></tr>"
    comments.map(function(cmt) {
        kq = kq + "<tr><td width='80%'><p>"+cmt.comment+"</p></td><td width='20%'><b>"+cmt.user+"</b></td></tr>"
    })
    kq = kq + "</table></from>";
    kq = kq + "</div></div>"
    return kq;
}

module.exports.selectChitietAdmin = async function (maHoa) {
    var cthoa = await bangHoa.selectCTH(maHoa);
    var comments = await bangCMT.select(maHoa)
    var kq = "<div class='stylexx'>";
    kq = kq + "<table width='50%' align='left' border='1px' style='border-color:red;'>";
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
    kq = kq + "<div class='cmt-container'>";
    kq = kq + "<form id='formx' name='formx' method='post' action='/comments/"+cthoa[0].mahoa+"'>"
    kq = kq + "<span>COMMENTS</span>";
    kq = kq + "<table width='100%' border='0' cellpadding='0' cellspacing='2'>"
    kq = kq + "<tr><td width='80%'><input name='cmt' type='text' id='cmt' size='15' class='cmt-input'/></td> <td width='20%'> <input type='submit' name='Submit' value='Gửi' class='summit-bnt'/></td></tr>"
    kq = kq + "<tr><td width='80%'></td><td width='20%'><b></b></td></tr>"
    comments.map(function(cmt) {
        kq = kq + "<tr><td width='80%'><p>"+cmt.comment+"</p></td><td width='20%'><b>"+cmt.user+"</b></td></tr>"
    })
    kq = kq + "</table></from>";
    kq = kq + "</div></div>"
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
module.exports.addComment = async function (data) {
    const cmt = await bangCMT.add(data);
    return cmt;
}