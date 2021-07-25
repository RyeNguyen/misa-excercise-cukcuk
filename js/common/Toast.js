class Toast {
    constructor(response, text) {
        this.response = response;
        this.text = text;

        this.initEvent();
    }

    initEvent() {
        //Khởi tạo toast trong DOM
        const toastElement = document.createElement('div');
        //Thêm class
        toastElement.classList.add('misa-toast');
        //Thêm class phụ là thông báo trả về
        toastElement.classList.add(`misa-${this.response}`);

        let title = document.createElement('div');
        title.classList.add('misa-toast__title');

        let icon = this.assignIcon(this.response);

        title.innerHTML += icon + this.text;
        toastElement.appendChild(title);

        const closeElement = document.createElement('div');
        const closeElementIcon = '<span><i class="fas fa-times"></i></span>';
        closeElement.classList.add('misa-toast__close');
        closeElement.innerHTML += closeElementIcon;

        toastElement.appendChild(closeElement);

        document.addEventListener('DOMContentLoaded', () => {
            const toastContainer = document.querySelectorAll(".misa-toast__container");
            // check if container already exist and add it if it doesen't
            if(toastContainer.length === 0){
                // prepare toast-container element
                const toastContainerContent = '<div class="misa-toast__container"></div>'
                // add it to the end of the body
                document.querySelector("body").innerHTML += toastContainerContent;
                const toastContainer = document.querySelector('.misa-toast__container');
                toastContainer.appendChild(toastElement);
            }
        });

        // setTimeout(() => {
        //     toastElement.classList.add('active');
        // }, 10);
        //
        // setTimeout(() => {
        //     toastElement.classList.remove('active');
        //     setTimeout(() => {
        //         toastElement.remove();
        //     }, 400);
        // }, 3000);
        //
        // //addEventListener on mouse click for standard closing of toast message on right top "x"
        // document.addEventListener('click', function (e) {
        //     //check is the right element clicked
        //     if (e.target.matches('.t-close')) {
        //         const toastElement = e.target.parentElement;
        //         toastElement.classList.remove('active');
        //         setTimeout(function(){
        //             toastElement.remove();
        //         }, 400);
        //     }
        // });

        //addEventListener on mouse click for standard closing of toast message on right top "x"
        // document.addEventListener('click', function (e) {
        //     //check is the right element clicked
        //     if (!e.target.matches('.btn-toast')) return;
        //     else{
        //         //create toast message with dataset attributes
        //         createToast(e.target.dataset.type, e.target.dataset.title, e.target.dataset.text, e.target.dataset.duration);
        //     }
        // });
    }

    assignIcon = (response) => {
        let icon;
        switch (response) {
            case '400': case '404': case '500':
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-exclamation-triangle"></i></span>';
                break;
            case '0':
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-check-circle"></i></span>';
                break;
            default:
                icon = '<span class="misa-toast__icon--main"><i class="fas fa-info-circle"></i></span>';
        }
        return icon;
    }
}