const textBox = document.querySelector('.misa-text-box--default input');
const popupModal = document.querySelector('.misa-modal-container');
const popupModalCloseBtn = document.querySelector('.misa-modal__button-close');

const buttonAdd = document.getElementById('button__add-employee');

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
    const formattedStr = number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return formattedStr.substr(0, formattedStr.length - 1);
}

const dateNum = (num) => {
    return num < 10 ? '0' + num : num
};

const dateFormatter = (str) => {
    if (str.length === 0) return '';
    const date = new Date(str);
    return `${dateNum(date.getDate())}/${dateNum(date.getMonth() + 1)}/${dateNum(date.getFullYear())}`;
}