var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// set the view engine to ejs
app.set("view engine", "ejs");
//Khai Báo Thư Viện Public
var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

// Session
var session = require('express-session');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '1234567abc',
  cookie: {
    maxAge: 60000
  }
}));

// send email
var nodemailer = require("nodemailer");

// upload file
const fileUpload = require('express-fileupload');
app.use(fileUpload());

var loaihoaController = require('./controllers/loaihoacontroller');
var hoaController = require('./controllers/hoacontroller');
var khachhangController = require('./controllers/khachhangcontroller');
var donhangController = require('./controllers/donhangcontroller');

async function HienThi(req, res, maloai) {
  var dslh = await loaihoaController.selectLH();
  var dshoa = await hoaController.select(maloai);
  var tenkh = "";
  var ttgh = TTGioHang(req);
  if (req.session.kh != undefined && req.session.kh != "")
    tenkh = "Chào " + req.session.kh.hoten + "\t<button type='button' onclick='Logout()'>Đăng xuất</button>";
  var menu = `
      <td width="33%" height="23" bgcolor="#CCFFCC"><strong><a href="/"><strong>Trang chủ</strong></a></td>
      <td width="33%"><strong><a href="/tim_kiem"><strong>Tìm kiếm bó hoa</strong></a></td>
      <td width="33%"><strong><a href="/dangky">Đăng ký mới</a></strong></td>
  `;
  if(req.session.kh != undefined && req.session.kh.role == "1"){
    menu = `
      <td width="14%" height="23" bgcolor="#CCFFCC"><strong><a href="/"><strong>Trang chủ</strong></a></td>
      <td width="14%"><strong><a href="/tim_kiem"><strong>Tìm kiếm bó hoa</strong></a></td>
      <td width="14%"><strong><a href="/dangky">Đăng ký mới</a></strong></td>
      <td width="16%"><strong><a href="/themhoa"><strong>Thêm bó hoa mới</strong></a></td>
      <td width="14%"><strong><a href="/themloaihoa"><strong>Thêm loại hoa mới</strong></a></td>
      <td width="14%"><strong><a href="/xoaloaihoa"><strong>Xóa loại hoa</strong></a></td>
      <td width="14%"><strong><a href="/thongbao"><strong>Thông báo</strong></a></td>
    `;
  }
  res.render("index", {
    dsloaihoa: dslh,
    chitiethoa: dshoa,
    tendn: tenkh,
    ttgh: ttgh,
    menu: menu
  });
}

async function ChiTietHoa(res, req) {
  var cthoa = await hoaController.selectChitiet(req.params.mahoa);
  if(req.session.kh != undefined && req.session.kh.role == "1")
    cthoa = await hoaController.selectChitietAdmin(req.params.mahoa);
  res.render("trang_chi_tiet_hoa", {
    chitiethoa: cthoa
  });
}

async function TimKiemHoa(res, tenhoa) {
  var cthoa = await hoaController.selectFind(tenhoa);
  res.render("tim_hoa", {
    chitiethoa: cthoa
  });
}

async function Dangnhap(req, res, tendn, matkhau) {
  if(tendn != ""&&matkhau !=""){
    var kh = await khachhangController.login(tendn, matkhau);
    req.session.kh = kh;
  }
  HienThi(req, res, 'Hoa-Cuc');
}

async function DangXuat(req, res) {
    req.session.kh = "";
    HienThi(req, res, 'Hoa-Cuc');
}

function TTGioHang(req) {
  var ttgh = "";
  var sl = 0;
  var tt = 0;
  if (req.session.giohang != undefined) {
    for (i = 0; i < req.session.giohang.length; i++) {
      sl = sl + req.session.giohang[i].soluong;
      tt = tt + req.session.giohang[i].soluong * req.session.giohang[i].giaban;
    }
    ttgh = "<b>Số lượng: </b>" + sl + "<br><b>Thành tiền: </b>" + tt + "<br><a href = '/chitietgiohang'>Chi tiết giỏ hàng</a>";
    return ttgh;
  }
}

function HienThiCTGH(req, res) {
  var giohang = req.session.giohang;
  var ttctgh = "";
  if (giohang != undefined) {
    ttctgh = "<table width='80%' cellpadding = '0' border = '1'>";
    ttctgh = ttctgh + "<tr><td width='10%'>STT</td><td width='15%'>Mã Hoa</td><td width='30%'>Tên Hoa</td><td width='15%'>Số Lượng</td><td width='15%'>Đơn giá</td><td>Thành Tiền</td><td>Xóa</td></tr>";
    var stt = 1;
    for (i = 0; i < giohang.length; i++) {
      ttctgh = ttctgh + "<tr><td>" + stt + "</td><td>" + giohang[i].mahoa + "</td><td>" + giohang[i].tenhoa + "</td><td><input type='text' value='" + giohang[i].soluong + "' name='txtsl" + giohang[i].mahoa + "'/></td><td>" + giohang[i].giaban + "</td><td>" + giohang[i].soluong * giohang[i].giaban + "</td><td><a href='#' onClick='Xoamahang(" + giohang[i].mahoa + ")'>Xóa</a></td></tr>";
      stt++;
    }
    ttctgh = ttctgh + "<tr><td colspan='7' align='right'><input type='submit' name='Submit' value='Cập nhật'></td></tr>"
    ttctgh = ttctgh + "</table>";
    hoten = "";
    diachi = "";
    dienthoai = "";
    email = "";
    if (req.session.kh != "" && req.session.kh != undefined) {
      hoten = req.session.kh.hoten;
      diachi = req.session.kh.diachi;
      dienthoai = req.session.kh.dienthoai;
      email = req.session.kh.email;
    }
    res.render('trangdathang', {
      ttctdh: ttctgh,
      hoten: hoten,
      diachi: diachi,
      dienthoai: dienthoai,
      email: email,
    });
  }
}

function sendEmail(toMail, subject, message) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'banhangnodejs@gmail.com',
      pass: 'node123$%^'
    }
  });
  var mailOptions = {
    from: 'banhangnodejs@gmail.com',
    to: toMail,
    subject: subject,
    html: message
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email send: ' + info.response);
    }
  });
}

async function ThemHoa(res) {
  var dslh = await loaihoaController.showCombo();
  res.render("trangthemhoa", {
    dslh: dslh
  });
}

async function XoaLoaiHoa(res) {
  var dslh = await loaihoaController.showCombo();
  res.render("trangxoaloaihoa", {
    dslh: dslh
  });
}

app.get('/xoaloaihoa', function (req, res) {
  XoaLoaiHoa(res);
});

app.post('/xoaloai', function (req, res) {
  var thongtin = req.body;
  var maloaihoa = thongtin.loai;
  loaihoaController.delete(maloaihoa);
  res.redirect("/");
});

app.get('/xoahoa/:mahoa', function (req, res) {
  var mahoa = req.params.mahoa;
  hoaController.delete(mahoa);
  res.redirect("/");
});

app.get('/themloaihoa', function (req, res) {
  res.render("trangthemloaihoa");
});

app.post('/themloaihoamoi', function (req, res) {
  var thongtin = req.body;
  loaiHoaMoi = {
    maloai: thongtin.ma_loai,
    tenloai: thongtin.ten_loai
  };
  console.log(loaiHoaMoi);
  loaihoaController.insert(loaiHoaMoi);
  res.redirect("/");
});

app.get('/themhoa', function (req, res) {
  ThemHoa(res);
});

app.post('/themmoihoa', function (req, res) {
  var thongtin = req.body;
  let sampleFile;
  let uploadPath;
  sampleFile = req.files.file;
  hoaMoi = {
    tenhoa: thongtin.ten_hoa,
    maloai: thongtin.loai,
    hinh: sampleFile.name,
    giaban: thongtin.gia_ban,
    mota: thongtin.mo_ta
  };
  hoaController.insert(hoaMoi);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file were uploaded');
  }
  uploadPath = __dirname + '/public/images/' + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    res.redirect("/" + thongtin.loai);
  });
});

app.post('/xulydathang', async function (req, res) {
  var thongtin = req.body;
  hoten = thongtin.ho_ten;
  diachi = thongtin.dia_chi;
  dienthoai = thongtin.dien_thoai;
  email = thongtin.email;
  var dh = {
    sodh: 1,
    hoten: hoten,
    diachi: diachi,
    dienthoai: dienthoai,
    email: email
  };
  dh.dsmh = req.session.giohang;
  kq = donhangController.insert(dh);
  giohang = req.session.giohang;
  ttctgh = "<h1 align='center'>Thông Tin Đơn Hàng</h1>";
  ttctgh += "<p>Họ tên: " + hoten + "</p>";
  ttctgh += "<p>Địa chỉ giao hàng: " + diachi + "</p>";
  ttctgh += "<p>Điện thoại: " + dienthoai + "</p>";
  ttctgh += "<p>Email: " + email + "</p>";
  ttctgh += "<table width='80%' border='1' cellspacing='0' cellpadding='2'>";
  ttctgh += "<tr><td width='10%'>STT</td><td width='10%'>Mã Hoa</td><td width='30%'>Tên Hoa</td><td width='10%'>Số Lượng</td><td width='12%'>Đơn Giá</td><td>Thành Tiền</td></tr>";
  var stt = 1;
  var tongtien = 0;
  for (i = 0; i < giohang.length; i++) {
    ttctgh += "<tr><td>" + stt + "</td><td>" + giohang[i].mahoa + "</td><td>" + giohang[i].tenhoa + "</td><td>" + giohang[i].soluong + "</td><td>" + giohang[i].giaban + "</td><td>" + giohang[i].soluong * giohang[i].giaban + "</td></tr>";
    stt++;
    tongtien += giohang[i].soluong * giohang[i].giaban;
  }
  ttctgh += "<tr><td colspan='7' align='right'>Tổng tiền: " + tongtien + "</td></tr></table>";
  ttctgh += "<p>Cảm ơn quý khách đã đặt hàng, đơn hàng sẽ chuyển đến quý khách trong thời gian sớm nhất!</p>";
  sendEmail(email, "Đơn hàng shop hoa tươi Thanh Duy", ttctgh);
  if (kq) {
    req.session.giohang = null;
  }
  res.redirect('/');
});

app.post('/capnhatgiohang', function (req, res) {
  var thongtin = req.body;
  for (i = 0; i < req.session.giohang.length; i++) {
    req.session.giohang[i].soluong = eval("thongtin.txtsl" + req.session.giohang[i].mahoa) * 1;
  }
  res.redirect('/chitietgiohang');
});

app.get('/xoadonhang/:mahoa', function (req, res) {
  var mahoa = req.params.mahoa;
  for (i = 0; i < req.session.giohang.length; i++) {
    if (req.session.giohang[i].mahoa == mahoa) {
      req.session.giohang.splice(i, 1);
      break;
    }
  }
  res.redirect('/chitietgiohang');
});

app.get("/muahoa/:mahoa", async function (req, res) {
  var mahoa = req.params.mahoa;
  var hm = await hoaController.selectByCode(mahoa);
  if (req.session.giohang == undefined) {
    req.session.giohang = [];
    var hoa = {
      mahoa: mahoa,
      tenhoa: hm.tenhoa,
      giaban: hm.giaban,
      hinh: hm.hinh,
      soluong: 1
    };
    req.session.giohang[0] = hoa;
  } else {
    var exist = false;
    for (i = 0; i < req.session.giohang.length; i++) {
      if (req.session.giohang[i].mahoa == mahoa) {
        req.session.giohang[i].soluong++;
        exist = true;
        break;
      }
    }
    if (exist == false) {
      var hoa = {
        mahoa: mahoa,
        tenhoa: hm.tenhoa,
        giaban: hm.giaban,
        hinh: hm.hinh,
        soluong: 1
      };
      req.session.giohang[req.session.giohang.length] = hoa;
    }
  }
  res.redirect('/' + hm.maloai);
});

app.post("/dangky", function (req, res) {
  var thongtin = req.body;
  ten_dn = thongtin.ten_dn;
  mat_khau = thongtin.mat_khau;
  ho_ten = thongtin.ho_ten;
  email = thongtin.email;
  dia_chi = thongtin.dia_chi;
  dien_thoai = thongtin.so_dt;
  role = thongtin.quyen;
  kh = khachhangController.insert({
    tendn: ten_dn,
    matkhau: mat_khau,
    hoten: ho_ten,
    diachi: dia_chi,
    dienthoai: dien_thoai,
    email: email,
    role: role,
  });
  Dangnhap(req, res, ten_dn, mat_khau);
});

app.get("/dangky", function (req, res) {
  var quyen = `
    <td>
        <p class="style7">&nbsp;Quyền: </p>
      </td>
      <td>
        <label>
          <select id="quyen" name="quyen">
            <option value="0">Người dùng</option>
            </select>
        </label>
      </td>
  `;
  if(req.session.kh != undefined && req.session.kh.role == "1")
    quyen = `
      <td>
        <p class="style7">&nbsp;Quyền: </p>
      </td>
      <td>
        <label>
          <select id="quyen" name="quyen">
            <option value="0">Người dùng</option>
            <option value="1">Admin</option>
            </select>
        </label>
      </td>
    `
  res.render("trang_dang_ky", {
      role: quyen,
    });
})

app.post("/dangnhap", function (req, res) {
  var thongtin = req.body;
  tendn = thongtin.ten_dn;
  matkhau = thongtin.mat_khau;
  Dangnhap(req, res, tendn, matkhau);
});

app.get("/", function (req, res) {
  HienThi(req, res, 'Hoa-Cuc');
});

app.get("/tim_kiem", function (req, res) {
  TimKiemHoa(res, "None");
});

app.post("/tim_kiem", function (req, res) {
  var kq = req.body;
  var tenhoa = kq.tenh;
  TimKiemHoa(res, tenhoa);
});

app.get("/detail/:mahoa", function (req, res) {
  ChiTietHoa(res, req);
});

app.get("/logout", function (req, res) {
  DangXuat(req, res);
});

app.get("/:maloai", function (req, res) {
  var ml = req.params.maloai;
  if (ml == 'chitietgiohang')
    HienThiCTGH(req, res);
  else
    HienThi(req, res, req.params.maloai);
});

app.get("/loaihoa", loaihoaController.select, (req, res) => {

});

app.listen(80);