export default class DataValidator {
    //Hàm hiện thông báo lỗi khi nhập sai input
    //@params ô nhập và text thông báo cần hiện
    //Author: NQMinh(23/07/2021)
    static showError = (input, msg) => {
        const errorBubble = document.createElement('div');
        errorBubble.classList.add('misa-bubble--alert');
        errorBubble.textContent = msg;
        input.parentElement.append(errorBubble);
    }

    static validateEmail = () => {
        const self = this;
        const  inputEmail = document.getElementById('input-employee-email');
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        inputEmail.addEventListener('input', () => {
            const email = inputEmail.value;
            if (!re.test(String(email).toLowerCase())) {
                self.showError(inputEmail, 'Email không đúng định dạng');
            }
        })
    }
    
    //Hàm kiểm tra ô nhập trống
    //Author: NQMinh(21/07/2021)
    static validateRequired = () => {
        const self = this;
        const requiredFields = document.querySelectorAll('input[required]');
        // if (required.val().trim() === '') return false;
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim() === '') {
                    field.classList.add('misa-input--alert');
                    field.setAttribute('title', 'Thông tin này bắt buộc nhập!');
                    self.showError(field, 'Thông tin này bắt buộc nhập');
                } else {
                    field.classList.remove('misa-input--alert');
                    field.removeAttribute('title');
                }
            })

            field.addEventListener('input', () => {
                const inputField = field.parentElement;
                const lastChild = inputField.lastElementChild;
                if (lastChild.className === 'misa-bubble--alert') {
                    inputField.removeChild(lastChild);
                }
            })
        })
    }

    static validateAll = () => {

    }
}