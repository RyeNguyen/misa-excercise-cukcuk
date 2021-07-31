export default class DateFormatter {
    //Hàm định dạng ngày tháng
    //@params 1 string ngày tháng default HTML, 1 biến onModal kiểm tra đây có phải dữ liệu render trên form sửa nhân viên
    //@returns trống || null => trống, else 2 trường hợp: dữ liệu trả về cho modal => dạng yyyy-mm-dd, render table=> dạng dd/mm/yyyy
    //Author: NQMinh(18/07/2021)
    static format = (str, onModal) => {
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
        return num < 10 ? '0' + num : num;
    };
}