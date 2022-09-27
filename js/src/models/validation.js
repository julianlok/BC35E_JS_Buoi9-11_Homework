function Validation() {
    // phương thức kiễm tra rỗng
    this.checkEmpty = function (value, divError, mess) {
        if (value.trim() == '') {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = 'block';
            return false;
        };
        getEle(divError).innerHTML = '';
        getEle(divError).style.display = 'none';
        return true;
    };

    // phương thức kiểm tra độ dài kí tự
    this.checkCharacterLength = function (value, divError, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // phương thức kiểm tra chuỗi kí tự
    this.checkStringCharacter = function (value, divError, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        if (value.match(letter)) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // phương thức kiểm tra định dạng email

    this.checkEmailFormat = function (value, divError, mess) {
        var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(format)) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // phương thức kiểm tra mật khẩu
    this.checkPass = function (value, divError, mess) {
        var passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.match(passFormat)) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    //  phương thức kiểm tra ngày làm hợp lệ 

    this.checkDateFormat = function (value, divError, mess) {
        var dateFormat = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

        if (value.match(dateFormat)) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;

    };

    // phương thức validation lương cơ bản từ 1e+6 - 20e+6

    this.CheckBasicSalary = function (value, divError, mess) {
        if (Number(value >= 1e+6 && Number(value <= 20e+6))) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // Phương thức chọn chức vụ hợp lệ
    this.checkPosition = function (idSelect, divError, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // phương thức validation giờ làm từ 80 - 200

    this.CheckWorkingHour = function (value, divError, mess) {
        if (Number(value >= 80 && Number(value <= 200))) {
            getEle(divError).innerHTML = '';
            getEle(divError).style.display = 'none';
            return true;
        };
        getEle(divError).innerHTML = mess;
        getEle(divError).style.display = 'block';
        return false;
    };

    // Phương thức kiểm tra nhân viên trùng tài khoản

    this.checkStaffExist = function (value, divError, mess, arr) {
        var isExist = false;

        for (i = 0; i < arr.length; i++) {
            var staff = arr[i];
            if (staff.account == value) {
                isExist = true;
                break;
            };
        };

        if (isExist) {
            getEle(divError).innerHTML = mess;
            getEle(divError).style.display = 'block';
            return false;

        };
        getEle(divError).innerHTML = '';
        getEle(divError).style.display = 'none';
        return true;
    };
};