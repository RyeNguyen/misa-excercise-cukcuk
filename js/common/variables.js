$(document).ready(() => {
    const original = new Variables();
})

class Variables {
    //Biến cờ lưu tạm id của một nhân viên
    static employeeId = null;

    //Biến kiểm tra xem API đã từng được gọi chưa để load dữ liệu cho dropdown 1 lần duy nhất
    //Author: NQMinh(22/7/2021)
    static APIWasCalled = false;

    //Các element trên trang chủ
    //nút xóa nhân viên
    static buttonDelete = $('#button__delete-employee');
    //nút thêm nhân viên
    static buttonAdd = $('#button__add-employee');
    //nút refresh bảng nhân viên
    static buttonRefresh = $('#button__refresh');
    //nội dung chính của web (gồm các mục tìm kiếm, bảng nhân viên, etc)
    static content = $('.misa-content');
    //input tìm kiếm
    static textBox = $('.misa-text-box--default input');
    //popup modal
    static popupModal = $('.misa-modal-container');
    //các nút paging của footer
    static paginationButtons = $('.misa__pagination .pagination__number');

    //Các element trên table nhân viên
    static employeesTable = $('.misa-content__table');

    //Các element trên header
    //header trái (gồm logo)
    static headerLeft = $('.misa-header--left');
    //header phải(gồm tên nhà hàng, profile user, etc)
    static headerRight = $('.misa-header--right');
    //logo website
    static logo = $('.misa-header .header__logo');

    //Các element trên thanh menu bên trái
    //menu chính
    static menu = $('.misa-menu');
    //các đường link trên thanh menu
    static menuItems = $('.misa-menu__item');
    //các icon trong từng đường link trên thanh menu
    static menuItemIconList =  $('.misa-menu .misa-menu__icon');
    //các text trong từng đường link trên thanh menu
    static menuItemTextList = $('.misa-menu .misa-menu__item-text');
    //nút toggle trên góc trái của web
    static menuToggle = $('.misa-header .header__toggle');

    //Các element trên popup modal
    //Input phần thông tin chung:
    static inputEmployeeCode = $('#input-employee-code');
    static inputName = $('#input-employee-name');
    static inputDob = $('#input-employee-date-born');
    static inputId = $('#input-employee-id');
    static inputIdDate = $('#input-employee-id-date');
    static inputIdPlace = $('#input-employee-id-place');
    static inputEmail = $('#input-employee-email');
    static inputPhone = $('#input-employee-phone');
    static inputCompanyDate = $('#input-employee-date-company');

    //Input phần thông tin công việc:
    static inputEmployeeTax = $('#input-employee-wage');
    static inputIncome = $('#input-employee-income');
    static popupModalInputs = $('.misa-modal-container input');

    static submitBtn = $('#button__submit');
    static cancelBtn = $('#button__cancel');
    static popupModalCloseBtn = $('.misa-modal__button-close');
}