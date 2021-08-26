export default class CurrencyFormatter {
    //Hàm định dạng tiền tệ
    //@params 1 con số bất kỳ
    //@returns con số được format kiểu tiền Việt ở dạng string
    //Author: NQMinh(18/07/2021)
    static format = (salary) => {
        this.numericOnly();
        let result = '';
        if (salary !== null) {
            for (let i = String(salary).length; i > 0; i -= 3) {
                if (i > 3) {
                    const number = String(salary).slice(i - 3, i);
                    result += number.split('').reverse().join('') + '.';
                } else {
                    const number = String(salary).slice(0, i);
                    result += number.split('').reverse().join('');
                }
            }
            return result.split('').reverse().join('');
        } else {
            return '';
        }
    }

    //Hàm ngăn chặn các ký tự ngoài ký tự số được nhập vào input
    //Author: NQMinh(22/07/2021)
    static numericOnly = () => {
        const inputIncome = document.getElementById('input-employee-income');
        inputIncome.setAttribute('onkeydown', `return ( event.ctrlKey || event.altKey
                    || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false)
                    || (95<event.keyCode && event.keyCode<106)
                    || (event.keyCode==8) || (event.keyCode==9)
                    || (event.keyCode>34 && event.keyCode<40)
                    || (event.keyCode==46) )`);
    }
}