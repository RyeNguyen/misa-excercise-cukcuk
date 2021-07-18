//Khởi tạo object dropdown với các chức năng cơ bản
function DropdownInfo(btn, content, icon, options, title) {
    this.btn = document.querySelector(btn);
    this.content = document.querySelector(content);
    this.icon = document.querySelector(icon);
    this.options = document.querySelectorAll(options);
    this.title = document.querySelector(title);

    //Chức năng show options
    this.btn.addEventListener('click', () => {
        this.icon.classList.toggle('misa-rotate180');
        this.content.classList.toggle('dropdown__content--showed');
    })

    this.options.forEach(option => {
        option.addEventListener('click', () => {
            //Thay đổi title của dropdown
            this.title.textContent = option.textContent;

            //Ản hiên các dropdown options đang active (cần convert options thành array để chạy vòng for)
            const dropdownOptions = Array.prototype.slice.call(this.options);
            for (let i = 0; i < dropdownOptions.length; i++) {
                dropdownOptions[i].classList.remove('dropdown__content-link--active');
            }
            option.classList.add('dropdown__content-link--active');

            //Ẩn options khi chọn xong
            this.content.classList.remove('dropdown__content--showed');
            this.icon.classList.toggle('misa-rotate180');
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

const dropdownRestaurant = new DropdownInfo(
    '#dropdown__restaurant .dropdown__button',
    '#dropdown__restaurant .dropdown__content',
    '#dropdown__restaurant i',
    '#dropdown__restaurant a',
    '#dropdown__restaurant .dropdown__title'
)

const dropdownRoom = new DropdownInfo(
    '#dropdown__room .dropdown__button',
    '#dropdown__room .dropdown__content',
    '#dropdown__room i',
    '#dropdown__room a',
    '#dropdown__room .dropdown__title'
)

const dropdownRole = new DropdownInfo(
    '#dropdown__role .dropdown__button',
    '#dropdown__role .dropdown__content',
    '#dropdown__role i',
    '#dropdown__role a',
    '#dropdown__role .dropdown__title'
)
