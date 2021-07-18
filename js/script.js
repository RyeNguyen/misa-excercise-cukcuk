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

const currencyFormatter = (number) => {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

const dateNum = (num) => {
    return num < 10 ? '0' + num : num
};

const dateFormatter = (str) => {
    if (str.length === 0) return '';
    const date = new Date(str);
    return `${dateNum(date.getDate())}/${dateNum(date.getMonth() + 1)}/${dateNum(date.getFullYear())}`;
}