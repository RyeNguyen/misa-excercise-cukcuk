const textBox = $('.misa-text-box--default input');
const popupModal = $('.misa-modal-container');
const popupModalInputs = $('.misa-modal-container input');

const buttonAdd = $('#button__add-employee');
const buttonRefresh = $('#button__refresh');

const paginationButtons = $('.misa__pagination .pagination__number');

//Hàm xử lý sự kiện khi click vào các button phần footer
//Author: NQMinh(20/07/2021)
paginationButtons.click(function() {
    paginationButtons.removeClass('active');
    $(this).toggleClass('active');
})

//Dãn width text-box căn theo placeholder
//Author: NQMinh(15/07/2021)
textBox.attr('size', textBox.attr('placeholder').length);

//Hiển thị form thêm mới nhân viên khi nhấn button thêm nhân viên
//Author: NQMinh(15/07/2021)
buttonAdd.click(() => {
    openModal();
    //reset form
    popupModalInputs.val(null);

    //lấy mã nhân viên mới và thực hiện binding vào input mã nhân viên
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
        method: 'GET'
    }).done(res => {
        inputEmployeeCode.val(res);
    }).fail(res => {
        console.log(res);
    })

    //lấy dữ liệu cho dropdown
    //1. Dữ liệu vị trí
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method: 'GET',
        async: true
    }).done(res => {
        console.log(res);
        $('#dropdown__modal-role .dropdown__content').empty();
        res.forEach(position => {
            const positionName = position['PositionName'];
            const positionId= position['PositionId'];
            let positionHTML = `<a value="${positionId}"><i class="fas fa-check"></i>${positionName}</a>`;
            $('#dropdown__modal-role .dropdown__content').append(positionHTML);
            modalRole= new DropdownInfo('#dropdown__modal-role');
        })
    }).fail(res => {
        console.log(res);
    })

    //1. Dữ liệu phòng ban
    $.ajax({
        url: 'http://cukcuk.manhnv.net/api/Department',
        method: 'GET',
        async: true
    }).done(res => {
        $('#dropdown__work-place .dropdown__content').empty();
        res.forEach(department => {
            const departmentName = department['DepartmentName'];
            const departmentId= department['DepartmentId'];
            let departmentHTML = `<a value="${departmentId}"><i class="fas fa-check"></i>${departmentName}</a>`;
            $('#dropdown__work-place .dropdown__content').append(departmentHTML);
            modalWorkPlace = new DropdownInfo('#dropdown__work-place');
        })
    }).fail(res => {
        console.log(res);
    })
})

buttonRefresh.click(() => {
    loadData();
})

//Hàm định dạng tiền tệ
//@params 1 con số bất kỳ
//@returns con số được format kiểu tiền Việt ở dạng string
//Author: NQMinh(18/07/2021)
const currencyFormatter = (number) => {
    const formattedStr = number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return formattedStr.substr(0, formattedStr.length - 1);
}

//Hàm định dạng ngày tháng
//@params 1 string ngày tháng của dạng default của HTML
//@returns nếu đầu vào trống thì trả về trống, còn không thì trả về string dạng ngày tháng đã được format dd/mm/yyyy
//Author: NQMinh(18/07/2021)
const dateFormatter = (str) => {
    if (str.length === 0) return '';
    const date = new Date(str);
    return `${dateNum(date.getDate())}/${dateNum(date.getMonth() + 1)}/${dateNum(date.getFullYear())}`;
}

//Hàm định dạng cụ thể ngày và tháng
//@params 1 con số bất kỳ
//@returns nếu số x có 1 chữ số thì trả về dưới dạng '0x', nếu không thì trả về đúng số đó
//Author: NQMinh(18/07/2021)
const dateNum = (num) => {
    return num < 10 ? '0' + num : num
};