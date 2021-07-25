class EmployeeIdAPI {
    //Hàm call API lấy mã nhân viên mới từ server và binding vào input mã nhân viên
    //Author: NQMinh(22/07/2021)
    static getEmployeeCode = () => {
        EmployeePage.wantToCreateNewEmployee = true;

        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
                method: 'GET'
            }).done(res => {
                Variables.inputEmployeeCode.val(res);
            }).fail(res => {
                switch(res.status) {
                    case 500:
                        alert('Code cùi');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    case 404:
                        alert('Quay đầu là bờ');
                        break;
                }
            })
            EmployeePage.openModal();
        } catch (error) {
            console.log(error);
        }
    }
}