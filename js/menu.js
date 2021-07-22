const menuToggle = $('.misa-header .header__toggle');
const menu = $('.misa-menu');
const menuItemIconList =  $('.misa-menu .misa-menu__icon');
const menuItemTextList = $('.misa-menu .misa-menu__item-text');
const logo = $('.misa-header .header__logo');
const headerLeft = $('.misa-header--left');
const headerRight = $('.misa-header--right');
const content = $('.misa-content');
const menuItems = $('.misa-menu__item');

//Xử lý sự kiện click vào các item trên menu
//Author(15/07/2021)
menuItems.click(function() {
    menuItems.removeClass('misa-menu__item--active');
    $(this).addClass('misa-menu__item--active');
})

//Xử lý sự kiện thu gọn menu khi nhấn nút toggle góc trái
//Author(17/07/2021)
menuToggle.click(() => {
    menuItemIconList.toggleClass('misa-menu__icon--shrink');
    menuItems.toggleClass('misa-menu__item--shrink');
    menuItemTextList.toggleClass('misa-hidden');
    menuToggle.toggleClass('header__toggled');
    logo.toggleClass('misa-hidden');
    headerLeft.toggleClass('misa-header--left-shrink');
    headerRight.toggleClass('misa-header--right-extend');
    menu.toggleClass('misa-menu--shrink');
    content.toggleClass('misa-content--extend');
})