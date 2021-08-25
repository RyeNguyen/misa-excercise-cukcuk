export default class DataValidator {
    requiredFields;
    inputEmail;
    allDataIsValid;

    constructor() {
        this.requiredFields = document.querySelectorAll('input[required]');
        this.inputEmail = document.getElementById('input-employee-email');

        this.hideTooltipOnFocus();
        this.validateAll();
    }

    /**
     * Phương thức hiện thông báo lỗi khi nhập sai input
     * @param {object} input - ô nhập
     * @param {string} msg - text thông báo
     * Author: NQMinh(23/07/2021)
     */
    showError = (input, msg) => {
        const errorBubble = document.createElement('div');
        errorBubble.classList.add('misa-bubble--alert');
        errorBubble.textContent = msg;
        input.parentElement.append(errorBubble);
        return true;
    }

    /**
     * Phương thức ẩn tooltip
     * @param field - trường input cần nhập
     */
    hideTooltip = (field) => {
        const inputField = field.parentElement;
        const lastChild = inputField.lastElementChild;
        if (lastChild.className === 'misa-bubble--alert') {
            inputField.removeChild(lastChild);
        }
    }

    /**
     * Phương thức ẩn tooltop khi focus in
     */
    hideTooltipOnFocus = () => {
        const self = this;
        self.requiredFields.forEach((field) => {
            field.addEventListener('focusin', () => {
                self.hideTooltip(field);
            })
        })
    }

    /**
     * Phương thức kiểm tra dữ liệu email
     * Author: NQMinh(22/07/2021)
     */
    validateEmail = () => {
        const self = this;

        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let alertExisted = false;

        self.inputEmail.addEventListener('input', () => {
            const email = self.inputEmail.value;
            if (!re.test(String(email).toLowerCase())) {
                self.allDataIsValid = false;
                if (!alertExisted) {
                    self.showError(self.inputEmail, 'Email không đúng định dạng');
                    alertExisted = true;
                }
            } else {
                self.allDataIsValid = true;
                alertExisted = false;
                this.hideTooltip(self.inputEmail);
            }
        })
    }

    /**
     * Phương thức kiểm tra ô nhập trống
     * @returns {boolean}
     * Author: NQMinh(21/07/2021)
     */
    validateRequired = () => {
        const self = this;

        self.requiredFields.forEach((field) => {
            field.addEventListener('blur', () => {
                if (field.value.trim() === '') {
                    self.allDataIsValid = false;
                    field.classList.add('misa-input--alert');
                    field.setAttribute('title', 'Thông tin này bắt buộc nhập!');
                    self.showError(field, 'Thông tin này bắt buộc nhập');
                } else {
                    self.allDataIsValid = true;
                    field.classList.remove('misa-input--alert');
                    field.removeAttribute('title');
                }
            })
        })
    }

    /**
     *
     * @returns {boolean}
     */
    validateAll = () => {
        this.validateRequired();
        this.validateEmail();
        console.log(this.allDataIsValid);
        return this.allDataIsValid;
    }
}