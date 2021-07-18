const menuToggle = document.querySelector('.misa-header .header__toggle');
const menu = document.querySelector('.misa-menu');
const menuItemIconList = document.querySelectorAll('.misa-menu .misa-menu__icon');
const menuItemTextList = document.querySelectorAll('.misa-menu .misa-menu__item-text');
const logo = document.querySelector('.misa-header .header__logo');
const headerLeft = document.querySelector('.misa-header--left');
const headerRight = document.querySelector('.misa-header--right');
const content = document.querySelector('.misa-content');

let menuItems = document.querySelectorAll('.misa-menu__item');
menuItems = Array.prototype.slice.call(menuItems);

//Xử lý functionality của menu
menuItems.map(menuItem => {
    menuItem.addEventListener('click', () => {
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('misa-menu__item--active');
        }
        menuItem.classList.add('misa-menu__item--active');
    })
})

//Thu gọn menu khi nhấn nút toggle góc trái
menuToggle.addEventListener('click', () => {
    menuItemIconList.forEach(itemIcon => {
        itemIcon.classList.toggle('misa-menu__icon--shrink');
    })
    menuItems.forEach(item => {
        item.classList.toggle('misa-menu__item--shrink');
    })
    menuItemTextList.forEach(itemText => {
        itemText.classList.toggle('misa-hidden');
    })

    menuToggle.classList.toggle('header__toggled');
    logo.classList.toggle('misa-hidden');
    headerLeft.classList.toggle('misa-header--left-shrink');
    headerRight.classList.toggle('misa-header--right-extend');
    menu.classList.toggle('misa-menu--shrink');
    content.classList.toggle('misa-content--extend');
})