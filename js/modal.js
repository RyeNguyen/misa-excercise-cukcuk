const inputIncome = document.getElementById('input-employee-income');
console.log(inputIncome.value);

const modalSex = new dropdownInfo(
    '#dropdown__sex .dropdown__button',
    '#dropdown__sex .dropdown__content',
    '#dropdown__sex i',
    '#dropdown__sex a',
    '#dropdown__sex .dropdown__title'
);

const modalRole = new dropdownInfo(
    '#dropdown__modal-role .dropdown__button',
    '#dropdown__modal-role .dropdown__content',
    '#dropdown__modal-role i',
    '#dropdown__modal-role a',
    '#dropdown__modal-role .dropdown__title'
);

const modalWorkPlace = new dropdownInfo(
    '#dropdown__work-place .dropdown__button',
    '#dropdown__work-place .dropdown__content',
    '#dropdown__work-place i',
    '#dropdown__work-place a',
    '#dropdown__work-place .dropdown__title'
);

const modalWorkStatus = new dropdownInfo(
    '#dropdown__work-status .dropdown__button',
    '#dropdown__work-status .dropdown__content',
    '#dropdown__work-status i',
    '#dropdown__work-status a',
    '#dropdown__work-status .dropdown__title'
)

window.onclick = function (event) {
    if (popupModal.style.display === 'flex') {
        if (event.target.matches('.misa-modal-container')) {
            popupModal.style.display = 'none';
        }
    }
}

assignDropdown(modalSex);
assignDropdown(modalRole);
assignDropdown(modalWorkPlace);
assignDropdown(modalWorkStatus);





const currencyFormatter = (number) => {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

console.log(currencyFormatter(100000))

inputIncome.addEventListener('input', () => {
    console.log(inputIncome.value)
    inputIncome.value = currencyFormatter(inputIncome.value);
});