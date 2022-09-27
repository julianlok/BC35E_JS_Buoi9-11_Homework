var stafflist = new Stafflist();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

// lấy thông tin nhân viên
function getStaffInfo(isAdd) {
    var account = getEle('tknv').value;
    var fullName = getEle('name').value;
    var email = getEle('email').value;
    var password = getEle('password').value;
    var dayAttendance = getEle('datepicker').value;
    var basicSalary = getEle('luongCB').value;
    // var position = getEle('chucvu').options[getEle('chucvu').selectedIndex].text;
    var position = getEle('chucvu').value;
    var workingHour = getEle('gioLam').value;

    //validation
    var isValid = true;

    if (isAdd) {
        // validation account
        isValid &= validation.checkEmpty(
            account,
            'tbTKNV',
            '(*) Vui lòng nhập tài khoản'
        ) && validation.checkCharacterLength(
            account,
            'tbTKNV',
            '(*) Vui lòng nhập từ 4 - 6 ký số',
            4,
            6
        ) && validation.checkStaffExist(
            account,
            'tbTKNV',
            '(*) Số tài khoản đã tồn tại, vui lòng nhập số khác',
            stafflist.arr
        )
    };

    // validation fullName
    isValid &= validation.checkEmpty(
        fullName,
        'tbTen',
        '(*) Vui lòng nhập tên tài khoản'
    ) && validation.checkStringCharacter(
        fullName,
        'tbTen',
        '(*) Vui lòng nhập chuỗi kí tự từ A - Z'
    )

    // validation email
    isValid &= validation.checkEmpty(
        email,
        'tbEmail',
        '(*) Vui lòng nhập email'
    ) && validation.checkEmailFormat(
        email,
        'tbEmail',
        '(*) Vui lòng nhập đúng định dạng email'
    )

    // validation password
    isValid &= validation.checkEmpty(
        password,
        'tbMatKhau',
        '(*) Vui lòng nhập mật khẩu'
    ) && validation.checkCharacterLength(
        password,
        'tbMatKhau',
        '(*) Vui lòng nhập từ 6 - 10 ký tự',
        6,
        10
    ) && validation.checkPass(
        password,
        'tbMatKhau',
        '(*) Vui lòng nhập mật khẩu ít nhất 1 ký tự số, in hoa và đặc biệt'
    )

    // validation dayAttendance
    isValid &= validation.checkEmpty(
        dayAttendance,
        'tbNgay',
        '(*) Vui lòng nhập ngày làm'
    ) && validation.checkDateFormat(
        dayAttendance,
        'tbNgay',
        '(*) Vui lòng nhập theo định dạng "Tháng / Ngày / Năm"'
    )

    // validation basicSalary
    isValid &= validation.checkEmpty(
        basicSalary,
        'tbLuongCB',
        '(*) Vui lòng nhập lương cơ bản'
    ) && validation.CheckBasicSalary(
        basicSalary,
        'tbLuongCB',
        '(*) Vui lòng nhập lương cơ bản từ 1triệu - 20triệu'
    )

    // validation position
    isValid &= validation.checkPosition(
        'chucvu',
        'tbChucVu',
        '(*) Vui lòng chọn chức vụ'
    )

    // validation workingHour
    isValid &= validation.checkEmpty(
        workingHour,
        'tbGiolam',
        '(*) Vui lòng nhập số giờ làm'
    ) && validation.CheckWorkingHour(
        workingHour,
        'tbGiolam',
        '(*) Vui lòng nhập số giờ làm từ 80 - 200'
    )


    if (isValid) {
        var staff = new Staff(account, fullName, email, password, dayAttendance, basicSalary, position, workingHour);

        // phương thức tính tổng lương lấy từ lớp đối tượng nhân viên
        staff.salaryCal();
        // phương thức xếp loại nhân viên lấy từ lớp đối tượng nhân viên
        staff.volumeUp();

        return staff;
    };

    return null;

    // tạo đối tượng nhân viên

};

// validation

function renderTableStaff(data) {
    var content = '';
    //duyệt mảng lấy thông tin từng đối tượng cần render table ra UI
    data.forEach(function (staff) {
        content += `
            <tr>
                <td>${staff.account}</td>
                <td>${staff.fullName}</td>
                <td>${staff.email}</td>
                <td>${staff.dayAttendance}</td>
                <td>${staff.position}</td>
                <td>${staff.totalAmount}</td>
                <td>${staff.classify}</td>
                <td>
                    <button onclick="removeStaff('${staff.account}')" class="btn btn-danger">Xóa</button>
                    <button onclick="editStaff('${staff.account}')" class="btn btn-primary" data-toggle="modal"
                    data-target="#myModal">Sửa</button>
                </td>
            </tr>
        `;
    });

    getEle('tableDanhSach').innerHTML = content;
};

// tao localstorage

function setLocalStorage() {
    var dataString = JSON.stringify(stafflist.arr);
    localStorage.setItem('STAFFLIST', dataString);
};

//  lay localstorage
function getLocalStorage() {
    if (localStorage.getItem('STAFFLIST')) {
        var dataString = localStorage.getItem('STAFFLIST');
        stafflist.arr = JSON.parse(dataString);
        renderTableStaff(stafflist.arr);
    };
};

// thêm nhân viên mới
getEle('btnThemNV').addEventListener('click', function () {
    // lấy thông tin sinh viên

    var staff = getStaffInfo(true);

    if (staff) {

        //push từng đối tượng nhân viên vô danh sách nhân viên
        stafflist.addStaff(staff);

        //render mảng danh sách nhân viên lên UI
        renderTableStaff(stafflist.arr);

        setLocalStorage();

    };

});

//xóa nhân viên

function removeStaff(account) {
    stafflist.delStaff(account);
    renderTableStaff(stafflist.arr);
    setLocalStorage();
}

// lấy thông tin nhân viên cần sửa

function editStaff(account) {

    var staff = stafflist.getInfoS(account);

    getEle('tknv').value = staff.account;
    getEle('tknv').disabled = true;
    getEle('name').value = staff.fullName;
    getEle('email').value = staff.email;
    getEle('password').value = staff.password;
    getEle('datepicker').value = staff.dayAttendance;
    getEle('luongCB').value = staff.basicSalary;
    getEle('chucvu').value = staff.position;
    getEle('gioLam').value = staff.workingHour;

    getEle('btnThemNV').style.display = 'none';

    getEle('btnCapNhat').style.display = 'inline-block';
};

//cập nhật nhân viên
getEle('btnCapNhat').addEventListener('click', function () {
    var staff = getStaffInfo(false);

    stafflist.upDateStaff(staff);
    renderTableStaff(stafflist.arr);
    setLocalStorage();

});

// tìm kiếm nhân viên theo xếp loại xuất sắc, giỏi, khá và hiển thị
getEle('searchName').addEventListener('keyup', function () {
    var keyword = getEle('searchName').value;

    var searchArray = stafflist.searchClassify(keyword);
    renderTableStaff(searchArray);
});

getEle('btnThem').addEventListener('click', function () {
    getEle('btnThemNV').style.display = 'inline-block';

    getEle('btnCapNhat').style.display = 'none';
});

getEle('btnReset').addEventListener('click', function () {
    getEle('tknv').value = '';
    getEle('tknv').disabled = false;
    getEle('name').value = '';
    getEle('email').value = '';
    getEle('password').value = '';
    getEle('datepicker').value = '';
    getEle('luongCB').value = '';
    getEle('gioLam').value = '';

});





