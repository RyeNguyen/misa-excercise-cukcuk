//Khởi tạo object dropdown
function dropdownInfo(btn, content, icon, options, title) {
    this.btn = document.querySelector(btn);
    this.content = document.querySelector(content);
    this.icon = document.querySelector(icon);
    this.options = document.querySelectorAll(options);
    this.title = document.querySelector(title);
}

//Assign chức năng cho các object dropdown
const assignDropdown = (dropdown) => {
    //Chức năng show options 
    dropdown.btn.addEventListener('click', () => {
        dropdown.icon.classList.toggle('misa-rotate180');
        dropdown.content.classList.toggle('dropdown__content--showed');
    })

    dropdown.options.forEach(option => {
        option.addEventListener('click', () => {
            //Chức năng thay đổi title của dropdown
            const chosenOption = option.textContent;
            dropdown.title.textContent = chosenOption;

            //Ản hiên các dropdown options đang active (cần convert options thành array để chạy vòng for)
            const dropdownOptions = Array.prototype.slice.call(dropdown.options);
            for (let i = 0; i < dropdownOptions.length; i++) {
                dropdownOptions[i].classList.remove('dropdown__content-link--active');
            }
            option.classList.add('dropdown__content-link--active');

            //Ẩn options khi chọn xong
            dropdown.content.classList.remove('dropdown__content--showed');
            dropdown.icon.classList.toggle('misa-rotate180');
        })
    })
}

//window.addEventListener('click', (ev) => {
//    console.log(ev.target.matches('.dropdown__button') || ev.target.matches('.dropdown__title'));
//    if (!ev.target.matches('.dropdown__button') || !ev.target.matches('.dropdown__title')) {
//        const dropdownContents = document.getElementsByClassName("dropdown__content");
//        for (let i = 0; i < dropdownContents.length; i++) {
//            const openDropdown = dropdownContents[i];
//            console.log(openDropdown);
//            if (openDropdown.classList.contains('dropdown__content--showed')) {
//                openDropdown.classList.remove('dropdown__content--showed');
//            }
//        }
//    }
//})

const dropdownRestaurant = new dropdownInfo(
    '#dropdown__restaurant .dropdown__button',
    '#dropdown__restaurant .dropdown__content',
    '#dropdown__restaurant i',
    '#dropdown__restaurant a',
    '#dropdown__restaurant .dropdown__title'
)

assignDropdown(dropdownRestaurant);

const dropdownRoom = new dropdownInfo(
    '#dropdown__room .dropdown__button',
    '#dropdown__room .dropdown__content',
    '#dropdown__room i',
    '#dropdown__room a',
    '#dropdown__room .dropdown__title'
)

assignDropdown(dropdownRoom);

const dropdownRole = new dropdownInfo(
    '#dropdown__role .dropdown__button',
    '#dropdown__role .dropdown__content',
    '#dropdown__role i',
    '#dropdown__role a',
    '#dropdown__role .dropdown__title'
)

assignDropdown(dropdownRole);
