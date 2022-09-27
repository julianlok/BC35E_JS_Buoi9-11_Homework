function Staff(account,fullName,email,password,dayAttendance,basicSalary,position,workingHour) {
    // property
    this.account = account;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dayAttendance = dayAttendance;
    this.basicSalary = basicSalary;
    this.position = position;
    this.workingHour = workingHour;
    this.totalAmount = 0;
    this.classify = '';

    // method

    // phương thức tính tổng lương
    this.salaryCal = function () {
        var position = getEle('chucvu').value;
        switch (position) {
            case 'Sếp':
                this.totalAmount = this.basicSalary * 3;
                break;

            case 'Trưởng Phòng':
                this.totalAmount = this.basicSalary * 2;
                break;

            case 'Nhân Viên':
                this.totalAmount = this.basicSalary * 1;
                break;
        };
    };

    // phương thức xếp loại cho từng đối tượng nhân viên
    this.volumeUp = function(){
      this.classify = this.workingHour >= 192 ? 'Nhân viên xuất sắc' : this.workingHour >= 176 ? 'Nhân viên giỏi' : this.workingHour >= 160 ? 'Nhân viên khá' : 'Nhân viên trung bình';
    };
};