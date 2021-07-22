let positionsArray = [];

//Khởi tạo object dropdown với các chức năng cơ bản
//Author: NQMinh (16/07/2021)
function DropdownInfo(dropdownId) {
    this.btn = $(`${dropdownId} .dropdown__button`);
    this.content = $(`${dropdownId} .dropdown__content`);
    this.icon = $(`${dropdownId} i:first`);
    this.options = $(`${dropdownId} a`);
    this.title = document.querySelector(`${dropdownId} .dropdown__title`);

    //Chức năng show options
    this.btn.click(() => {
        this.icon.toggleClass('misa-rotate180');
        this.content.toggleClass('dropdown__content--showed');
    })

    assignDropdownOptions(this);
}

const assignDropdownOptions = (dropdown) => {
    dropdown.options.click(function (event) {
        //Thay đổi title của dropdown
        dropdown.title.textContent = event.target.textContent;

        //Ản hiên các dropdown options đang active (cần convert options thành array để chạy vòng for)
        dropdown.options.removeClass('dropdown__content-link--active');
        $(this).addClass('dropdown__content-link--active');

        //Ẩn options khi chọn xong
        dropdown.content.removeClass('dropdown__content--showed');
        dropdown.icon.toggleClass('misa-rotate180');
    })
}

//Function xử lý sự kiện đóng dropdown khi click ra ngoài
//Author: NQMinh(19/07/2021)
window.addEventListener('click', (ev) => {
    //Nếu click ngoài button hoặc title
    if (!ev.target.matches('.dropdown__button') && !ev.target.matches('.dropdown__title')) {
        //toàn bộ các dropdown xổ ra của cả trang
        const dropdownContents = document.getElementsByClassName("dropdown__content");

        //các icon mũi tên
        const dropdownIcons = document.querySelectorAll(".dropdown__button i");

        //đóng toàn bộ dropdown
        for (let i = 0; i < dropdownContents.length; i++) {
            const openDropdown = dropdownContents[i];
            if (openDropdown.classList.contains('dropdown__content--showed')) {
                openDropdown.classList.remove('dropdown__content--showed');
            }
        }

        //xoay toàn bộ mũi tên
        for (let i = 0; i < dropdownIcons.length; i++) {
            dropdownIcons[i].classList.remove('misa-rotate180');
        }
    }
})

// getPositions = async () => {
//     try {
//         const response = await fetch('http://cukcuk.manhnv.net/v1/Positions');
//         positionsArray = await response.json();
//
//         let positions = '';
//         positionsArray.forEach(item => {
//             positions += `<a href="#"><i class="fas fa-check"></i>${item['PositionName']}</a>`;
//         })
//         dropdownRole.content.innerHTML = positions;
//         assignDropdownOptions(dropdownRole);
//     } catch (err) {
//         console.error(err);
//     }
// }

const dropdownRestaurant = new DropdownInfo('#dropdown__restaurant');

const dropdownRoom = new DropdownInfo('#dropdown__room');

const dropdownRole = new DropdownInfo('#dropdown__role');