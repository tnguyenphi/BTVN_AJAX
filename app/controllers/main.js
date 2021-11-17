
//Global
var service = new UserService();
// var validation = new Validation();
var users = new ListUser();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

// Lấy thông tin từ API
function getListUser() {
    service.getListUserApi()
        .then(function (result) {
            console.log(result);
            renderData(result.data);
            users.setUserList(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getListUser();

// Show thông tin ra ngoài màn hình

function renderData(data) {
    var content = "";
    data.forEach(function (item, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${item.id})">Delete</button>
            </td>
        </tr>
        `;
    })
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

/**
 * Delete User
 */
function deleteUser(id) {
    service.deleteUserApi(id)
        .then(function () {
            alert("delete success!");
            // làm nới dữ liệu mới nhất từ sever
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
        });
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm User Mới";
    var footerModal = `<button class="btn btn-success" onclick ="addUser()">Add User</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;
});

//ADD User

function addUser() {
    //lấy value từ thẻ input
    var tenTK = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var pass = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var loaiNN = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    // chỉ được phép thêm sv khi tất cả dữ liệu đều hợp lệ
    // giả sử dữ liệu hợp lệ
    var isValid = true;

    isValid &= validation.checkEmpty(tenTK, "Tên Tài Khoản không được để trống", "tbTK") && validation.checkAccount(tenTK, "Tên Tài Khoản không được trùng", "tbTK", users.arrayUser);
    isValid &= validation.checkEmpty(hoTen, "Họ và tên không được để trống", "tbHT") && validation.checkName(hoTen, "Họ và tên phải là dịnh dạng chữ", "tbHT");
    //Password: 
    isValid &= validation.checkEmpty(pass, "Password không được để trống", "tbMK") && validation.checkPass(pass, "Mật khẩu phải đúng định dạng", "tbMK");

    //Email: Kiểm tra rỗng, kiểm tra định dạng email
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");
    //Hình Ảnh
    isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống", "tbHA");
    //loạiND
    isValid &= validation.checkSelect("loaiNguoiDung", "Chọn Loại Người Dùng", "tbLND");
    //loạiNN
    isValid &= validation.checkSelect("loaiNgonNgu", "Chọn Loại Người Dùng", "tbNN");
    //Mô tả
    isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống", "tbMT") && validation.checkTextbox(moTa, "Mô tả không được vượt quá 60 ký tự", "tbMT");

    if (isValid) {
        var user = new UserInformation("", tenTK, hoTen, pass, email, hinhAnh, loaiND, loaiNN, moTa);
        console.log(user);
        service.addUserApi(user)
            .then(function (result) {
                //tắt modal
                document.getElementsByClassName("close")[0].click();
                getListUser()
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

//Edit
function editUser(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Sản Phẩm";
    var footerModal = `<button onclick="updateUser(${id})" class="btn btn-success">Update User</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footerModal;
    service.getUserById(id)
        .then(function (result) {
            //hiển thị thông tin product lên UI
            // console.log(result.data);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;

        })
        .catch(function (error) {
            console.log(error.data);
        })
}

//update

function updateUser(id) {
    var tenTK = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var pass = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var loaiNN = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    var isValid = true;

    isValid &= validation.checkEmpty(tenTK, "Tên Tài Khoản không được để trống", "tbTK") && validation.checkAccount(tenTK, "Tên Tài Khoản không được trùng", "tbTK", users.arrayUser);
    isValid &= validation.checkEmpty(hoTen, "Họ và tên không được để trống", "tbHT") && validation.checkName(hoTen, "Họ và tên phải là dịnh dạng chữ", "tbHT");
    //Password: 
    isValid &= validation.checkEmpty(pass, "Password không được để trống", "tbMK") && validation.checkPass(pass, "Mật khẩu phải đúng định dạng", "tbMK");

    //Email: Kiểm tra rỗng, kiểm tra định dạng email
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");
    //Hình Ảnh
    isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống", "tbHA");
    //loạiND
    isValid &= validation.checkSelect("loaiNguoiDung", "Chọn Loại Người Dùng", "tbLND");
    //loạiNN
    isValid &= validation.checkSelect("loaiNgonNgu", "Chọn Loại Người Dùng", "tbNN");
    //Mô tả
    isValid &= validation.checkEmpty(moTa, "Mô tả không được để trống", "tbMT") && validation.checkTextbox(moTa, "Mô tả không được vượt quá 60 ký tự", "tbMT");

    if (isValid) {
        var user = new UserInformation(id, tenTK, hoTen, pass, email, hinhAnh, loaiND, loaiNN, moTa);
        service.updateUserApi(user)
            .then(function (result) {
                //tat modal
                document.getElementsByClassName("close")[0].click();
                //lam moi data
                getListUser();

            })
            .catch(function (error) {
                // console.log(error.data);
            })
    }
}

getEle("txtSearch").onkeyup = function(){
    var key = getEle("txtSearch").value;
    var arrayKey = users.searchName(key);
    renderData(arrayKey);
}