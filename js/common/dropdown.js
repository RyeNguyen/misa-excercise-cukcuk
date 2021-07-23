class Dropdown {
    constructor(dropdownId) {
        this.btn = $(`${dropdownId} .dropdown__button`);
        this.content = $(`${dropdownId} .dropdown__content`);
        this.icon = $(`${dropdownId} i:first`);
        this.options = $(`${dropdownId} a`);
        this.title = document.querySelector(`${dropdownId} .dropdown__title`);

        this.initEvent();
        this.assignDropdownOptions();
    }

    initEvent() {
        //Function xử lý sự kiện đóng dropdown khi click ra ngoài
        //Author: NQMinh(19/07/2021)
        window.addEventListener('click', (ev) => {
            //Nếu click ngoài button hoặc title
            if (!ev.target.matches('.dropdown__button') &&
                !ev.target.matches('.dropdown__title')
                /*!ev.target.matches($('.dropdown__button i:first'))*/) {
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

        //Chức năng show options
        this.btn.click(() => this.showDropdownOptions())
    }

    //Hàm xử lý sự kiện click vào dropdown thì xổ ra options
    //Author: NQMinh(22/07/2021)
    showDropdownOptions = () => {
        this.icon.toggleClass('misa-rotate180');
        this.content.toggleClass('dropdown__content--showed');
    }

    //Hàm gán chức năng chọn các options cho các dropdown
    //Author: NQMinh(18/07/2021)
    assignDropdownOptions = () => {
        const self = this;
        self.options.click(function (event) {
            //Thay đổi title của dropdown
            self.title.textContent = event.target.textContent;

            //Ản hiên các dropdown options đang active
            self.options.removeClass('dropdown__content-link--active');
            $(this).addClass('dropdown__content-link--active');
            $(self).attr('value', $(this).attr('value'));

            //Ẩn options khi chọn xong
            self.content.removeClass('dropdown__content--showed');
            self.icon.toggleClass('misa-rotate180');
        })
    }
}