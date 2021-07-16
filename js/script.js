const textBox = document.querySelector('.misa-text-box--default input');
const popupModal = document.querySelector('.misa-modal-container');
const popupModalCloseBtn = document.querySelector('.misa-modal__button-close');

let menuItems = document.querySelectorAll('.misa-menu__item');
menuItems = Array.prototype.slice.call(menuItems);

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

window.onclick = function (event) {
    if (!event.target.matches('.misa-dropdown__button')) {
        var dropdowns = document.getElementsByClassName("dropdown__content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('dropdown__content--showed')) {
                openDropdown.classList.remove('dropdown__content--showed');
                openDropdown.classList.add('dropdown__content--hidden')
            }
        }
    }
}

function dropdownInfo(btn, content, icon) {
    this.btn = document.getElementById(btn);
    this.content = document.getElementById(content);
    this.icon = document.querySelector(icon);
}

const assignDropdown = (dropdown) => {
    dropdown.btn.addEventListener('click', () => {
        dropdown.icon.classList.toggle('misa-rotate180');
        dropdown.content.classList.toggle('dropdown__content--showed');
    })
}

const dropdownRoom = new dropdownInfo(
    'dropdown__room',
    'dropdown__content-room',
    '.misa-dropdown #dropdown__room i'
)

assignDropdown(dropdownRoom);

const dropdownRole = new dropdownInfo(
    'dropdown__role',
    'dropdown__content-role',
    '.misa-dropdown #dropdown__role i'
)

assignDropdown(dropdownRole);

const dropdownRestaurant = new dropdownInfo(
    'dropdown__restaurant',
    'dropdown__content-restaurant',
    '.misa-dropdown #dropdown__restaurant i'
)

assignDropdown(dropdownRestaurant);

buttonAdd.addEventListener('click', () => {
    popupModal.style.display = 'flex';
})

popupModalCloseBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
})