function Stafflist() {
    //property
    this.arr = [];

    //method

    // thêm nhân viên mới;
    this.addStaff = function (staff) {
        this.arr.push(staff)
    };

    // vị trí nhân viên

    this.positionOfStaff = function (account) {
        var index = -1;

        this.arr.forEach(function (staff, i) {
            if (staff.account == account) {
                index = i
            };
        });
        return index;
    };

    // xóa nhân viên

    this.delStaff = function (account) {
        var index = this.positionOfStaff(account);

        if (index !== -1) {
            this.arr.splice(index, 1);
        };
    };

    // lấy thông tin nhân viên cần sửa

    this.getInfoS = function (account) {
        var index = this.positionOfStaff(account);

        if (index !== -1) {
            return this.arr[index];
        };
        return null;
    };

    // cập nhật nhân viên

    this.upDateStaff = function (staff) {
        var index = this.positionOfStaff(staff.account);

        if (index !== -1) {
            this.arr[index] = staff;
        };
    };

    //tìm kiếm nhân viên

    this.searchClassify = function(keyword){
      var searchArray =[];

      this.arr.forEach(function(staff){
        var searchOut = staff.classify.toLowerCase();
        var txtSearch = keyword.toLowerCase();

        if(searchOut.indexOf(txtSearch) !== -1){
            searchArray.push(staff);
        }
      }); 
      return searchArray;
    };
};