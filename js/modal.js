const inputIncome = document.getElementById('input-employee-income');

const modalSex = new DropdownInfo(
    '#dropdown__sex .dropdown__button',
    '#dropdown__sex .dropdown__content',
    '#dropdown__sex i',
    '#dropdown__sex a',
    '#dropdown__sex .dropdown__title'
);

const modalRole = new DropdownInfo(
    '#dropdown__modal-role .dropdown__button',
    '#dropdown__modal-role .dropdown__content',
    '#dropdown__modal-role i',
    '#dropdown__modal-role a',
    '#dropdown__modal-role .dropdown__title'
);

const modalWorkPlace = new DropdownInfo(
    '#dropdown__work-place .dropdown__button',
    '#dropdown__work-place .dropdown__content',
    '#dropdown__work-place i',
    '#dropdown__work-place a',
    '#dropdown__work-place .dropdown__title'
);

const modalWorkStatus = new DropdownInfo(
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

inputIncome.addEventListener('change', () => {
    inputIncome.value = parseFloat(inputIncome.value.replace(/,/g, ""))
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});