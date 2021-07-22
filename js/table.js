const employeesTable = $('.misa-content__table');
const employeeTableRow = $('.misa-content__table tbody tr');

//Hàm load lại dữ liệu danh sách nhân viên cho table
//Author: NQMinh(21/07/2021)
const loadData = () => {
    try {
        //Clean dữ liệu cũ đã hiển thị trong danh mục
        $('tbody').empty();

        //Call API lấy dữ liệu nhân viên
        //Author: NQMinh(17/07/2021)
        $.ajax({
            url: 'http://cukcuk.manhnv.net/v1/Employees',
            method: 'GET',
        }).done(function (res) {
            renderTable(res)
        }).fail(function (res) {
            console.log(res)
            alert('ERRORRRRRRRRRRRRRR');
        })
    } catch (error) {
        console.log(error)
    }
}

loadData();

//Hàm render table bằng dữ liệu lấy từ API
//Author: NQMinh(17/07/2021)
const renderTable = (tableData) => {
    tableData.forEach(employee => {
        const employeeCode = employee['EmployeeCode'];
        const fullName = employee['FullName'];
        const gender = employee['GenderName'];
        const dob = employee['DateOfBirth'];
        const phone = employee['PhoneNumber'];
        const email = employee['Email'];
        const position = employee['PositionName'];
        const department = employee['DepartmentName'];
        const salary = employee['Salary'];
        const workStatus = employee['WorkStatus'];
        const trHTML = $(`<tr tr-data="${employee['EmployeeId']}">
                        <td>${examineData(employeeCode)}</td>
                        <td>${examineData(fullName)}</td>
                        <td>${examineData(gender)}</td>
                        <td>${dateFormatter(examineData(dob))}</td>
                        <td>${examineData(phone)}</td>
                        <td>${examineData(email)}</td>
                        <td>${examineData(position)}</td>
                        <td>${examineData(department)}</td>
                        <td>${currencyFormatter(examineData(salary))}</td>
                        <td>${examineData(workStatus)}</td>
                    </tr>`);
        $('tbody').append(trHTML);
    })
}

//Hàm kiểm tra dữ liệu trả về
//@params dữ liệu cụ thể trong từng ô
//@returns khoảng trống nếu dữ liệu đó bằng null, còn không thì trả lại dữ liệu
//Author: NQMinh(17/07/2021)
const examineData = data => {
    return data ? data : '';
}

employeesTable.on('dblclick', 'tbody tr', function() {
    wantToCreateNewEmployee = false;
    //Hiển thị form chi tiết
    openModal();
    //Lấy id
    employeeId = $(this).attr('tr-data');
    try {
        $.ajax({
            url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
            method: 'GET',
        }).done(function (res) {
            //binding dữ liệu lên form
            bindingDataFromTable(res);
        }).fail(function (res) {
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
    } catch (error) {
        console.log(error)
    }
})