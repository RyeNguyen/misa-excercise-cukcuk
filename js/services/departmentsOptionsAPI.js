class DepartmentsOptionsAPI {
    //Hàm lấy dữ liệu phòng ban từ API
    //Author: NQMinh(21/07/2021)
    static getDepartmentOptions = () => {
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/api/Department',
                method: 'GET',
                async: true
            }).done(res => {
                $('#dropdown__work-place .dropdown__content').empty();
                res.forEach(department => {
                    const departmentName = department['DepartmentName'];
                    const departmentId= department['DepartmentId'];
                    let departmentHTML = `<a value="${departmentId}"><i class="fas fa-check"></i>${departmentName}</a>`;
                    $('#dropdown__room .dropdown__content').append(departmentHTML);
                    $('#dropdown__work-place .dropdown__content').append(departmentHTML);
                    EmployeePage.modalWorkPlace = new Dropdown('#dropdown__work-place');
                    EmployeePage.dropdownRoom = new Dropdown('#dropdown__room');
                })
            }).fail(res => {
                console.log(res);
            })
        } catch(error) {
            console.log(error);
        }
    }
}