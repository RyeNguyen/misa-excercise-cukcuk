const textBox = document.querySelector('.misa-text-box--default input');
const buttonRoomIcon = document.querySelector('.misa-dropdown #dropdown__room i');
const buttonRoleIcon = document.querySelector('.misa-dropdown #dropdown__role i');
const popupModal = document.querySelector('.misa-modal-container');
const popupModalCloseBtn = document.querySelector('.misa-modal__button-close');

let menuItems = document.querySelectorAll('.misa-menu__item');
menuItems = Array.prototype.slice.call(menuItems);

const dropdownButtonRoom = document.getElementById('dropdown__room');
const dropdownButtonRole = document.getElementById('dropdown__role');
const dropdownRoom = document.getElementById('dropdown__content-room');
const dropdownRole = document.getElementById('dropdown__content-role');
const buttonAdd = document.getElementById('button__add-employee');

menuItems.map(menuItem => {
    menuItem.addEventListener('click', () => {
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('misa-menu__item--active');
        }
        menuItem.classList.add('misa-menu__item--active');
    })
})

textBox.setAttribute('size', textBox.getAttribute('placeholder').length);

dropdownButtonRoom.addEventListener('click', () => {
    buttonRoomIcon.classList.toggle('misa-rotate180');
    dropdownRoom.classList.toggle('dropdown__content--showed');
})

dropdownButtonRole.addEventListener('click', () => {
    buttonRoleIcon.classList.toggle('misa-rotate180');
    dropdownRole.classList.toggle('dropdown__content--showed');
})

buttonAdd.addEventListener('click', () => {
    popupModal.style.display = 'flex';
})

popupModalCloseBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
})