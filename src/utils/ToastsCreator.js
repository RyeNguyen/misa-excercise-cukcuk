export default class Toast {
    constructor(response) {
        this.response = response;

        this.initEvent();
    }

    initEvent() {
        const toastElement = this.createToastELement(this.response);

        this.showToast(toastElement);
        this.removeToastOnTime(toastElement, 5000);

        document.querySelector('.misa-toast__close').addEventListener('click', () => {
            this.removeToastOnTime(toastElement, 0);
        })
        //TODO: Hàm đang không hoạt động, cần xem lại
        // this.removeToastOnClose();
    }

    //Hàm khởi tạo toast element
    //Author: NQMinh(25/07/2021)
    createToastELement = (resStatus) => {
        const toastElement = document.createElement('div');
        toastElement.classList.add('misa-toast');
        //Thêm class phụ để phân biệt giữa lỗi và thành công
        toastElement.classList.add(`misa-${resStatus}`);

        //Khởi tạo nội dung của toast
        let title = document.createElement('div');
        title.classList.add('misa-toast__title');

        //truyền icon thích hợp vào toast
        const icon = this.assignIcon(this.response);

        //truyền text thông báo thích hợp vào toast
        const text = this.createToastText(resStatus);

        //truyền nút close thích hợp vào toast
        const closeElement = this.createCloseBtn();

        //Nội dung của toast bao gồm icon và text vừa khởi tạo
        title.innerHTML += icon + text;
        toastElement.appendChild(title);
        toastElement.appendChild(closeElement);

        //select hộp chứa toast và thêm element mới tạo vào
        const toastContainer = document.querySelector('.misa-toast__container');
        toastContainer.appendChild(toastElement);

        return toastElement;
    }

    //Hàm khởi tạo text thông báo trong toast
    //Author: NQMinh(26/07/2021)
    createToastText = (resStatus) => {
        let text;
        switch (resStatus) {
            case 500:
                text = 'Lỗi server, vui lòng đợi ít phút';
                break;
            case 400:
                text = 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại';
                break;
            case 404:
                text = 'Địa chỉ không tồn tại, vui lòng quay về trang chủ';
                break;
            case 0:
                text = 'Thêm thông tin nhân viên thành công';
                break;
            case 1:
                text = 'Sửa thông tin nhân viên thành công';
                break;
            case 2:
                text = 'Xóa thông tin (các) nhân viên thành công';
                break;
            default:
                text = 'Tải dữ liệu thành công';
                break;
        }
        return text;
    }

    //Hàm khởi tạo icon trên toast
    //Author: NQMinh(25/07/2021)
    assignIcon = (response) => {
        let icon;
        switch (response) {
            case 400: case 404: case 500:
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-exclamation-triangle"></i></span>';
                break;
            case 0: case 1: case 2:
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-check"></i></span>';
                break;
            default:
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-info"></i></span>';
        }
        return icon;
    }

    //Hàm khởi tạo nút close trên toast
    //Author: NQMinh(26/07/2021)
    createCloseBtn = () => {
        const closeElement = document.createElement('div');
        const closeElementIcon = '<span><i class="fas fa-times"></i></span>';
        closeElement.classList.add('misa-toast__close');
        closeElement.innerHTML += closeElementIcon;
        return closeElement;
    }

    //Hàm hiện toast msg
    //Author: NQMinh(26/07/2021)
    showToast = (toastElement) => {
        setTimeout(() => {
            toastElement.classList.add('misa-toast--active');
        }, 10);
    }

    //Hàm xóa toast msg sau x giây
    //Author: NQMinh(26/07/2021)
    removeToastOnTime = (toastElement, second) => {
        setTimeout(() => {
            toastElement.classList.remove('misa-toast--active');
            setTimeout(() => {
                toastElement.remove();
            }, 400);
        }, second);
    }

    //Hàm xóa toast msg khi nhấn close
    //Author: NQMinh(26/07/2021)
    removeToastOnClose = () => {
        document.addEventListener('click', function (event) {
            if (event.target.matches('.misa-toast')) {
                console.log('what the f*ck')
                const toastElement = event.target.parentElement;
                toastElement.classList.remove('misa-toast--active');
                setTimeout(function(){
                    toastElement.remove();
                }, 400);
            }
        });
    }
}