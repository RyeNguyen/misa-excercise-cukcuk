const textBox = document.querySelector('.misa-text-box--default input');
const popupModal = document.querySelector('.misa-modal-container');
const popupModalCloseBtn = document.querySelector('.misa-modal__button-close');

let menuItems = document.querySelectorAll('.misa-menu__item');
menuItems = Array.prototype.slice.call(menuItems);

const buttonAdd = document.getElementById('button__add-employee');

//Xử lý functionality của menu
menuItems.map(menuItem => {
    menuItem.addEventListener('click', () => {
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('misa-menu__item--active');
        }
        menuItem.classList.add('misa-menu__item--active');
    })
})

//Dãn width text-box căn theo placeholder 
textBox.setAttribute('size', textBox.getAttribute('placeholder').length);

//Ẩn hiện popup modal
buttonAdd.addEventListener('click', () => {
    popupModal.style.display = 'flex';
    const employeeIdInput = document.getElementById('input-employee-code');
    employeeIdInput.focus();
})

popupModalCloseBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
})