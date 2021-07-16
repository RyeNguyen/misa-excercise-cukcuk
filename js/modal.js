const modalSex = new dropdownInfo(
    'dropdown__sex',
    'dropdown__content-sex',
    '#input-employee-sex i'
);

const modalRole = new dropdownInfo(
    'dropdown__modal-role',
    'dropdown__content-modal-role',
    '#input-employee-role i'
);

const modalWorkPlace = new dropdownInfo(
    'dropdown__work-place',
    'dropdown__content-work-place',
    '#input-employee-work-place i'
);

const modalWorkStatus = new dropdownInfo(
    'dropdown__work-status',
    'dropdown__content-work-status',
    '#input-employee-work-status i'
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