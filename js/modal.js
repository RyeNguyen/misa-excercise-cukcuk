const inputEmployeeCode = $('#input-employee-code');
const inputIncome = $('#input-employee-income');
const inputName = $('#input-employee-name');
const inputId = $('#input-employee-id');
const inputEmail = $('#input-employee-email');
const inputPhone = $('#input-employee-phone');
const submitBtn = $('#button__submit');
const cancelBtn = $('#button__cancel');
const popupModalCloseBtn = $('.misa-modal__button-close');

const modalSex = new DropdownInfo('#dropdown__sex');

let modalRole = new DropdownInfo('#dropdown__modal-role');

let modalWorkPlace = new DropdownInfo('#dropdown__work-place');

const modalWorkStatus = new DropdownInfo('#dropdown__work-status');

//Hàm mở form thêm thông tin nhân viên
//Author: NQMinh(17/07/2021)
const openModal = () => {
    popupModal.css('display', 'flex');
    //autofocus vào ô nhập đầu tiên
    inputEmployeeCode.focus();
}

//Hàm ẩn form thêm thông tin nhân viên
//Author: NQMinh(21/07/2021)
const closeModal = () => {
    popupModal.css('display', 'none');
}

//Xử lý sự kiện ẩn form thêm thông tin nhân viên khi click ra ngoài form
//Author: NQMinh(17/07/2021)
window.onclick = function (event) {
    if (popupModal.css('display') === 'flex') {
        if (event.target.matches('.misa-modal-container')) {
            popupModal.css('display', 'none');
        }
    }
}

//Validate dữ liệu nhập vào form
//Các trường bắt buộc nhập: mã nv, họ tên, cmnd, email, sđt
//Author: NQMinh(21/07/2021)
$('input[required]').blur(function() {
    if ($(this).val().trim() === '') {
        $(this).toggleClass('misa-input--alert');
        $(this).attr('title', 'Thông tin này bắt buộc nhập!');
    } else {
        $(this).removeClass('misa-input--alert');
        $(this).removeAttr('title');
    }
})

cancelBtn.click(() => closeModal());

popupModalCloseBtn.click(() => closeModal());

submitBtn.click(() => {
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
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees',
        method: 'POST',
        data: JSON.stringify(employee),
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(res) {
        alert('Them thanh cong');
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
})

// const showError = () => {
//     console.log('Loi Vkl :>')
// }
//
// //Check required fields
// function checkRequired(inputArr) {
//     inputArr.each(input => {
//         if (input.value.trim() === "") {
//
//         } else {
//
//         }
//     });
// }
//
// //Check email is valid
// function isValidEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
//
// function checkValidEmail(input) {
//     if (!isValidEmail(input.value)) {
//
//     } else {
//
//     }
// }

// inputIncome.addEventListener('change', () => {
//     inputIncome.value = parseFloat(inputIncome.value.replace(/,/g, ""))
//         .toFixed(0)
//         .toString()
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// });

// submitBtn.addEventListener('click', () => {
//     checkRequired([inputEmployeeId, inputName, inputId, inputEmail, inputPhone]);
//     checkValidEmail(inputEmail);
// })