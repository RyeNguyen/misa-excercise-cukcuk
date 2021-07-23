class Utility {
    //Hàm định dạng tiền tệ
    //@params 1 con số bất kỳ
    //@returns con số được format kiểu tiền Việt ở dạng string
    //Author: NQMinh(18/07/2021)
    static currencyFormatter = (salary) => {
        this.numericOnly();
        let result = '';
        if (salary != null) {
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
        Variables.inputIncome.attr('onkeydown', `return ( event.ctrlKey || event.altKey 
                    || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) 
                    || (95<event.keyCode && event.keyCode<106)
                    || (event.keyCode==8) || (event.keyCode==9) 
                    || (event.keyCode>34 && event.keyCode<40) 
                    || (event.keyCode==46) )`)
    }

    //Hàm định dạng ngày tháng
    //@params 1 string ngày tháng default HTML, 1 biến onModal kiểm tra đây có phải dữ liệu render trên form sửa nhân viên
    //@returns trống || null => trống, else 2 trường hợp: dữ liệu trả về cho modal => dạng yyyy-mm-dd, render table=> dạng dd/mm/yyyy
    //Author: NQMinh(18/07/2021)
    static dateFormatter = (str, onModal) => {
        if (!str) return '';
        if (str.length === 0) return '';
        const date = new Date(str);
        return onModal ?
            `${this.dateNum(date.getFullYear())}-${this.dateNum(date.getMonth() + 1)}-${this.dateNum(date.getDate())}` :
            `${this.dateNum(date.getDate())}/${this.dateNum(date.getMonth() + 1)}/${this.dateNum(date.getFullYear())}`;
    }

    //Hàm định dạng cụ thể ngày và tháng
    //@params 1 con số bất kỳ
    //@returns nếu số x có 1 chữ số thì trả về dưới dạng '0x', nếu không thì trả về đúng số đó
    //Author: NQMinh(18/07/2021)
    static dateNum = (num) => {
        return num < 10 ? '0' + num : num
    };
}