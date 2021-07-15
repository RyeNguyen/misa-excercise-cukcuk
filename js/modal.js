const modalSex = {
    dropdownButton: document.getElementById('dropdown__sex'),
    dropdownContent: document.getElementById('dropdown__content-sex'),
    dropdownIcon: document.querySelector('#input-employee-sex i')
}

const modalRole = {
    dropdownButton: document.getElementById('dropdown__modal-role'),
    dropdownContent: document.getElementById('dropdown__content-modal-role'),
    dropdownIcon: document.querySelector('#input-employee-role i')
}

const modalWorkPlace = {
    dropdownButton: document.getElementById('dropdown__work-place'),
    dropdownContent: document.getElementById('dropdown__content-work-place'),
    dropdownIcon: document.querySelector('#input-employee-work-place i')
}

const modalWorkStatus = {
    dropdownButton: document.getElementById('dropdown__work-status'),
    dropdownContent: document.getElementById('dropdown__content-work-status'),
    dropdownIcon: document.querySelector('#input-employee-work-status i')
}

const assignDropdown = (dropdown) => {
    dropdown.dropdownButton.addEventListener('click', () => {
        dropdown.dropdownIcon.classList.toggle('misa-rotate180');
        dropdown.dropdownContent.classList.toggle('dropdown__content--showed');
    })
}

console.log(modalSex.dropdownButton)

assignDropdown(modalSex);
assignDropdown(modalRole);
assignDropdown(modalWorkPlace);
assignDropdown(modalWorkStatus);