const textBox = $('.misa-text-box--default input');
const popupModal = $('.misa-modal-container');

const buttonAdd = $('#button__add-employee');
const buttonRefresh = $('#button__refresh');

const paginationButtons = $('.misa__pagination .pagination__number');

//Biến cờ lưu tạm id của một nhân viên
employeeId = null;

//Biến kiểm tra xem user khi click vào nút lưu là muốn sửa hay thêm mới nhân viên
//Author: NQMinh(22/7/2021)
wantToCreateNewEmployee = false;

//Biến kiểm tra xem API đã từng được gọi chưa để load dữ liệu cho dropdown 1 lần duy nhất
//Author: NQMinh(22/7/2021)
let APIWasCalled = false;

//Hàm lấy dữ liệu vị trí từ API
//Author: NQMinh(21/07/2021)
const getPositionsOptions = () => {
    //1. Dữ liệu vị trí
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET',
        async: true
    }).done(res => {
        $('#dropdown__modal-role .dropdown__content').empty();
        res.forEach(position => {
            const positionName = position['PositionName'];
            const positionId= position['PositionId'];
            let positionHTML = `<a value="${positionId}"><i class="fas fa-check"></i>${positionName}</a>`;
            $('#dropdown__role .dropdown__content').append(positionHTML);
            $('#dropdown__modal-role .dropdown__content').append(positionHTML);
            modalRole = new DropdownInfo('#dropdown__modal-role');
            dropdownRole = new DropdownInfo('#dropdown__role');
        })
    }).fail(res => {
        console.log(res);
    })
}

//Hàm lấy dữ liệu phòng ban từ API
//Author: NQMinh(21/07/2021)
const getDepartmentOptions = () => {
    //1. Dữ liệu phòng ban
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
            modalWorkPlace = new DropdownInfo('#dropdown__work-place');
            dropdownRoom = new DropdownInfo('#dropdown__room');
        })
    }).fail(res => {
        console.log(res);
    })
}

//Kiểm tra API đã từng được gọi chưa để load data 1 lần duy nhất
//Author: NQMinh(22/07/2021)
if (!APIWasCalled) {
    getPositionsOptions();
    getDepartmentOptions();
    APIWasCalled = true;
}

//Xử lý sự kiện khi click vào các button phần footer phân trang
//Author: NQMinh(20/07/2021)
paginationButtons.click(function() {
    paginationButtons.removeClass('active');
    $(this).toggleClass('active');
})

//Dãn width text-box căn theo placeholder
//Author: NQMinh(15/07/2021)
textBox.attr('size', textBox.attr('placeholder').length);

//Hiển thị form thêm mới nhân viên khi nhấn button thêm nhân viên
//Author: NQMinh(15/07/2021)
buttonAdd.click(() => {
    wantToCreateNewEmployee = true;
    //lấy mã nhân viên mới và thực hiện binding vào input mã nhân viên
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
        method: 'GET'
    }).done(res => {
        inputEmployeeCode.val(res);
    }).fail(res => {
        console.log(res);
    })
    openModal();
})

//Xử lý sự kiện nhấn nút refresh thì load lại data trong bảng
//Author: NQMinh(21/07/2021)
buttonRefresh.click(() => {
    loadData();
})

//Hàm lưu thông tin nhân viên khi sự kiện click xảy ra
//Author: NQMinh(22/07/2021)
function saveDataOnClick () {
    //fix tạm dữ liệu
    let employee = {
        "EmployeeId": "f44d3bec-ea01-11eb-94eb-42010a8c0002",
        "EmployeeCode": "NVF0067331320",
        "FirstName": null,
        "LastName": null,
        "FullName": "Đỗ Thị Hưng",
        "Gender": 1,
        "DateOfBirth": "3232-12-03T00:00:00",
        "PhoneNumber": "21423524124",
        "Email": "DTH@gmail.com",
        "Address": null,
        "IdentityNumber": "123124134230",
        "IdentityDate": "3333-12-03T00:00:00",
        "IdentityPlace": "HĐ-HN",
        "JoinDate": null,
        "MartialStatus": null,
        "EducationalBackground": null,
        "QualificationId": null,
        "DepartmentId": "17120d02-6ab5-3e43-18cb-66948daf6128",
        "PositionId": "548dce5f-5f29-4617-725d-e2ec561b0f41",
        "WorkStatus": 0,
        "PersonalTaxCode": "31231212321",
        "Salary": 2132132,
        "PositionCode": "P94",
        "PositionName": "Nhân viên",
        "DepartmentCode": "PB89",
        "DepartmentName": "Phòng đào tạo",
        "QualificationName": null,
        "GenderName": "Nam",
        "EducationalBackgroundName": null,
        "MartialStatusName": null,
        "CreatedDate": "2021-07-21T08:59:27",
        "CreatedBy": null,
        "ModifiedDate": "2021-07-21T09:01:07",
        "ModifiedBy": null
    };
    //TODO: validate toàn bộ dữ liệu

    //thu thập dữ liệu -> build thành object nhân viên
    employee.employeeCode = inputEmployeeCode.val();
    employee.fullName = inputName.val();
    employee.identityNumber = inputId.val();
    employee.email = inputEmail.val();
    employee.phoneNumber = inputPhone.val();

    //gọi đến API lưu dữ liệu
    console.log(wantToCreateNewEmployee)
    $.ajax({
        url: wantToCreateNewEmployee ?
            'http://cukcuk.manhnv.net/v1/Employees' :
            `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
        method: wantToCreateNewEmployee ? 'POST' : 'PUT',
        data: JSON.stringify(employee),
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(res) {
        loadData();
        closeModal();
    }).fail(function(res) {
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
}

//Hàm định dạng tiền tệ
//@params 1 con số bất kỳ
//@returns con số được format kiểu tiền Việt ở dạng string
//Author: NQMinh(18/07/2021)
const currencyFormatter = (number) => {
    const formattedStr = number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return formattedStr.substr(0, formattedStr.length - 1);
}

//Hàm định dạng ngày tháng
//@params 1 string ngày tháng của dạng default của HTML
//@returns nếu đầu vào trống thì trả về trống, còn không thì trả về string dạng ngày tháng đã được format dd/mm/yyyy
//Author: NQMinh(18/07/2021)
const dateFormatter = (str) => {
    if (str.length === 0) return '';
    const date = new Date(str);
    return `${dateNum(date.getDate())}/${dateNum(date.getMonth() + 1)}/${dateNum(date.getFullYear())}`;
}

//Hàm định dạng cụ thể ngày và tháng
//@params 1 con số bất kỳ
//@returns nếu số x có 1 chữ số thì trả về dưới dạng '0x', nếu không thì trả về đúng số đó
//Author: NQMinh(18/07/2021)
const dateNum = (num) => {
    return num < 10 ? '0' + num : num
};