const inputEmployeeCode = $('#input-employee-code');
const inputIncome = $('#input-employee-income');
const inputName = $('#input-employee-name');
const inputId = $('#input-employee-id');
const inputEmail = $('#input-employee-email');
const inputPhone = $('#input-employee-phone');
const popupModalInputs = $('.misa-modal-container input');
const submitBtn = $('#button__submit');
const cancelBtn = $('#button__cancel');
const popupModalCloseBtn = $('.misa-modal__button-close');

const modalSex = new DropdownInfo('#dropdown__sex');

let modalRole = new DropdownInfo('#dropdown__modal-role');

let modalWorkPlace = new DropdownInfo('#dropdown__work-place');

const modalWorkStatus = new DropdownInfo('#dropdown__work-status');

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

//SỰ kiện nhấn nút Hủy sẽ thoát modal
cancelBtn.click(() => closeModal());

//Sự kiện nhấn dấu x sẽ thoát modal
popupModalCloseBtn.click(() => closeModal());

//XỬ lý sự kiện click vào nút thêm nhân viên
//Author: NQMinh(21/07/2021)
submitBtn.click(() => saveDataOnClick());

//Hàm mở form thêm thông tin nhân viên
//Author: NQMinh(17/07/2021)
const openModal = () => {
    //reset form
    popupModalInputs.val(null);

    //reset các border cho các input, đã làm gì đâu mà viền đỏ
    popupModalInputs.removeClass('misa-input--alert');

    popupModal.css('display', 'flex');

    //autofocus vào ô nhập đầu tiên
    inputEmployeeCode.focus();
}

//Hàm ẩn form thêm thông tin nhân viên
//Author: NQMinh(21/07/2021)
const closeModal = () => {
    popupModal.css('display', 'none');
}

//Hàm binding dữ liệu từ các row vào modal
//Author: NQMinh(22/07/2021)
const bindingDataFromTable = (data) => {
    inputEmployeeCode.val(data['EmployeeCode']);
    inputName.val(data['FullName']);
}

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