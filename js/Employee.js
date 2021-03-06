$(document).ready(function () {
    new EmployeePage();
})

class EmployeePage {
    listName;

    //Biến kiểm tra xem user khi click vào nút lưu là muốn sửa hay thêm mới nhân viên
    //Author: NQMinh(22/7/2021)
    static wantToCreateNewEmployee = false;

    //Các dropdown trên trang chủ
    //dropdown chọn nhà hàng
    static dropdownRestaurant = new Dropdown('#dropdown__restaurant');
    //dropdown phòng ban ở trang chủ
    static dropdownRoom = new Dropdown('#dropdown__room');
    //dropdown vị trí ở trang chủ
    static dropdownRole = new Dropdown('#dropdown__role');

    //Các dropdown trên modal
    //dropdown giới tính
    static modalSex = new Dropdown('#dropdown__sex');
    //dropdown vị trị ở modal
    static modalRole = new Dropdown('#dropdown__modal-role');
    //dropdown phòng ban ở modal
    static modalWorkPlace = new Dropdown('#dropdown__work-place');
    //dropdown trạng thái làm việc
    static modalWorkStatus = new Dropdown('#dropdown__work-status');

    constructor() {
        //Load dữ liệu
        this.loadData();

        //Lấy dữ liệu Vị trí
        PositionsOptionsAPI.getPositionsOptions();

        //Lấy dữ liệu phòng ban
        DepartmentsOptionsAPI.getDepartmentOptions();

        //Khỏi tạo các sự kiện cho các thành phần
        this.initEvent();

        this.validateAll();
    }

    //Hàm ẩn form thêm thông tin nhân viên
    initEvent() {
        const self = this;
        //Xử lý sự kiện khi click vào các button phần footer phân trang
        //Author: NQMinh(20/07/2021)
        Variables.paginationButtons.click(() => {this.paging()});

        //Dãn width text-box căn theo placeholder
        //Author: NQMinh(15/07/2021)
        Variables.textBox.attr('size', Variables.textBox.attr('placeholder').length);

        //Sự kiện tìm kiếm của search input
        //Author: NQMinh(26/07/2021)
        Variables.inputSearch.on('input', () => {
            this.searchEmployee();
        });

        //Hiển thị form thêm mới nhân viên khi nhấn button thêm nhân viên
        //Author: NQMinh(15/07/2021)
        Variables.buttonAdd.click(() => EmployeeIdAPI.getEmployeeCode());

        //Hiển thị popup xóa nhân viên khi nhấn button xóa nhân viên
        //Author: NQMinh(25/07/2021)
        Variables.buttonDelete.click(() => this.openPopupAlert());

        //Xử lý sự kiện nhấn nút refresh thì load lại data trong bảng
        //Author: NQMinh(21/07/2021)
        Variables.buttonRefresh.click(() => this.loadData());

        //Xử lý sự kiện click vào các item trên menu
        //Author: NQMinh(15/07/2021)
        Variables.menuItems.click(function () {
            Variables.menuItems.removeClass('misa-menu__item--active');
            $(this).addClass('misa-menu__item--active');
        })

        //Xử lý sự kiện thu gọn menu khi nhấn nút toggle góc trái
        //Author: NQMinh(17/07/2021)
        Variables.menuToggle.click(() => this.toggleMenu());

        //Xử lý sự kiện click vào từng hàng thì checkbox được đánh dấu và nút xóa hiện lên
        //Author: NQMinh(24/07/2021)
        Variables.employeesTable.on('click', 'tbody tr', function() {
            self.rowActive(this);
        });

        //Sự kiện click hai lần vào table row -> lấy dữ liệu cá nhân nhân viên
        Variables.employeesTable.on('dblclick', 'tbody tr', function () {
            const self = this;
            EmployeePage.wantToCreateNewEmployee = false;
            //Hiển thị form chi tiết
            EmployeePage.openModal();
            //Lấy id
            Variables.employeeId = $(self).attr('tr-data');
            try {
                $.ajax({
                    url: `http://cukcuk.manhnv.net/v1/Employees/${Variables.employeeId}`,
                    method: 'GET',
                }).done(function (res) {
                    new Toast('ok');
                    //binding dữ liệu lên form
                    EmployeePage.bindingDataFromTable(res);
                }).fail(function (res) {
                    new Toast(res.status);
                })
            } catch (error) {
                console.log(error)
            }
        });

        //Sự kiện nhấn nút Hủy sẽ thoát modal
        Variables.cancelBtn.click(() => this.closeModal());

        //Sự kiện nhấn dấu x sẽ thoát modal
        Variables.popupModalCloseBtn.click(() => this.closeModal());

        //XỬ lý sự kiện click vào nút thêm nhân viên
        //Author: NQMinh(21/07/2021)
        Variables.submitBtn.click(() => self.saveDataOnClick(this));

        //Sự kiện nhấn nút Hủy sẽ thoát popup alert
        Variables.alertCancelBtn.click(() => this.closePopupAlert());

        //Sự kiện nhấn dấu x sẽ thoát popup alert
        Variables.alertCloseBtn.click(() => this.closePopupAlert());

        //Sự kiện click cho nút xóa, thực hiện kiểm tra các tr có checkbox active để xóa
        //Author: NQMinh(24/07/2021)
        Variables.alertDeleteBtn.click(() => {
            const checkboxes = $('tbody tr .delete-box input');
            checkboxes.each((index, box) => {
                if (box.getAttribute('checked') === 'checked') {
                    //input -> .delete-box -> td -> tr mới lấy được tr-data
                    const employeeIdToDelete = $(box).parent().parent().parent().attr('tr-data');
                    self.deleteEmployee(employeeIdToDelete);
                }
            })
            new Toast(2);
            self.loadData();
        });

        //Sự kiện định dạng ô nhập lương khi gõ
        //Author: NQMinh(22/07/2021)
        Variables.inputIncome.on('input', () => {
            const formatted = String(Variables.inputIncome.val()).replaceAll('.', '');
            Variables.inputIncome.val(Utility.currencyFormatter(formatted));
        });

        //Xử lý sự kiện ẩn form thêm thông tin nhân viên khi click ra ngoài form
        //Author: NQMinh(17/07/2021)
        window.onclick = function (event) {
            if (Variables.popupModal.css('display') === 'flex') {
                if (event.target.matches('.misa-modal-container')) {
                    Variables.popupModal.css('display', 'none');
                }
            }

            if (Variables.alertMessage.css('display') === 'flex') {
                if (event.target.matches('.misa-popup-container')) {
                    Variables.alertMessage.css('display', 'none');
                }
            }
        }
    }

    //Hàm load dữ liệu bảng từ server
    //Author: NQMinh(21/07/2021)
    loadData = () => {
        const self = this;
        try {
            //Clean dữ liệu cũ đã hiển thị trong danh mục
            $('tbody').empty();

            //Call API lấy dữ liệu nhân viên
            //Author: NQMinh(17/07/2021)
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Employees',
                method: 'GET',
            }).done(function (res) {
                self.listName = res;
                new Toast('ok');
                self.renderTable(res);
            }).fail(function (res) {
                new Toast(res.status);
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Hàm tìm kiếm nhân viên bằng cách gõ tên, mã nv hoặc sđt
    searchEmployee = () => {
        const tableBody = $('tbody');
        const keyword = Variables.inputSearch.val();
        //nếu ô nhập trống thì render toàn bộ dữ liệu
        // if (keyword.trim() === '') {
        //     tableBody.empty();
        //     this.renderTable(this.listName);
        // }

        //tạo một mảng mới được lọc dữ liệu từ mảng dữ liệu toàn cục
        const filteredList = this.listName.filter(item => {
            return (item['FullName'].toLowerCase().includes(keyword.toLowerCase()) ||
                item['EmployeeCode'].toLowerCase().includes(keyword.toLowerCase()) ||
                item['PhoneNumber'].includes(keyword)
            );
        })
        //phải làm trống bảng trước khi render bảng mới
        tableBody.empty();
        this.renderTable(filteredList);
    }

    //Hàm mở popup modal
    //Author: NQMinh(17/07/2021)
    static openModal = () => {
        //reset form
        Variables.popupModalInputs.val(null);

        //reset các border cho các input, đã làm gì đâu mà viền đỏ
        Variables.popupModalInputs.removeClass('misa-input--alert');
        $('div').remove('.misa-bubble--alert');
        Variables.popupModal.css('display', 'flex');

        //autofocus vào ô nhập đầu tiên
        Variables.inputEmployeeCode.focus();
    }

    //Hàm đóng modal
    //Author: NQMinh(21/07/2021)
    closeModal = () => {
        Variables.popupModal.css('display', 'none');
    }

    //Hàm mở thông báo xác nhận xóa
    //Author: NQMinh(24/07/2021)
    openPopupAlert = () => {
        Variables.alertMessage.css('display', 'flex');
    }

    //Hàm đóng thông báo xác nhận xóa
    //Author: NQMinh(24/07/2021)
    closePopupAlert = () => {
        Variables.alertMessage.css('display', 'none');
    }

    //Hàm binding dữ liệu từ table vào modal
    //Author: NQMinh(22/07/2021)
    static bindingDataFromTable = (data) => {
        //Thông tin chung
        Variables.inputEmployeeCode.val(data['EmployeeCode']);
        Variables.inputName.val(data['FullName']);
        Variables.inputDob.val(Utility.dateFormatter(data['DateOfBirth'], true));
        $('#dropdown__sex .dropdown__title').text((data['GenderName']) ? (data['GenderName']) : 'Chọn giới tính');
        Variables.inputId.val(data['IdentityNumber']);
        Variables.inputIdDate.val(Utility.dateFormatter(data['IdentityDate'], true));
        Variables.inputIdPlace.val(data['IdentityPlace']);
        Variables.inputEmail.val(data['Email']);
        Variables.inputPhone.val(data['PhoneNumber']);

        //Thông tin công việc
        Variables.inputEmployeeTax.val(data['PersonalTaxCode']);
        Variables.inputIncome.val(Utility.currencyFormatter(data['Salary']));
        Variables.inputCompanyDate.val(Utility.dateFormatter(data['CreatedDate'], true));
    }

    //Hàm lưu thông tin nhân viên lên server
    //Author: NQMinh(22/07/2021)
    saveDataOnClick = (self) => {
        //fix tạm dữ liệu
        let employee = {
            // "EmployeeId": "f44d3bec-ea01-11eb-94eb-42010a8c0002",
            // "EmployeeCode": "NVF0067331320",
            // "FirstName": null,
            // "LastName": null,
            // "FullName": "Đỗ Thị Hưng",
            // "Gender": 1,
            // "DateOfBirth": "3232-12-03T00:00:00",
            // "PhoneNumber": "21423524124",
            // "Email": "DTH@gmail.com",
            // "Address": null,
            // "IdentityNumber": "123124134230",
            // "IdentityDate": "3333-12-03T00:00:00",
            // "IdentityPlace": "HĐ-HN",
            // "JoinDate": null,
            // "MartialStatus": null,
            // "EducationalBackground": null,
            // "QualificationId": null,
            // "DepartmentId": "17120d02-6ab5-3e43-18cb-66948daf6128",
            // "PositionId": "548dce5f-5f29-4617-725d-e2ec561b0f41",
            // "WorkStatus": 0,
            // "PersonalTaxCode": "31231212321",
            // "Salary": 2132132,
            // "PositionCode": "P94",
            // "PositionName": "Nhân viên",
            // "DepartmentCode": "PB89",
            // "DepartmentName": "Phòng đào tạo",
            // "QualificationName": null,
            // "GenderName": "Nam",
            // "EducationalBackgroundName": null,
            // "MartialStatusName": null,
            // "CreatedDate": "2021-07-21T08:59:27",
            // "CreatedBy": null,
            // "ModifiedDate": "2021-07-21T09:01:07",
            // "ModifiedBy": null
        };
        //TODO: validate toàn bộ dữ liệu

        //thu thập dữ liệu -> build thành object nhân viên
        employee['EmployeeCode'] = Variables.inputEmployeeCode.val();
        employee['FullName'] = Variables.inputName.val();
        employee['DateOfBirth'] = Variables.inputDob.val();

        //TODO: không hiển thị -> sửa
        employee['GenderName'] = $('#dropdown__sex .dropdown__title').text();

        employee['IdentityNumber'] = Variables.inputId.val();
        employee['Email'] = Variables.inputEmail.val();
        employee['PhoneNumber'] = Variables.inputPhone.val();
        employee['PositionId'] = $('#dropdown__modal-role .dropdown__content-link--active').attr('value');
        employee['DepartmentId'] = $('#dropdown__work-place .dropdown__content-link--active').attr('value');
        employee['PersonalTaxCode'] = Variables.inputEmployeeTax.val();
        employee['Salary'] = parseInt(Variables.inputIncome.val().split('.').join(''));

        //gọi đến API lưu dữ liệu
        $.ajax({
            url: EmployeePage.wantToCreateNewEmployee ?
                'http://cukcuk.manhnv.net/v1/Employees' :
                `http://cukcuk.manhnv.net/v1/Employees/${Variables.employeeId}`,
            method: EmployeePage.wantToCreateNewEmployee ? 'POST' : 'PUT',
            data: JSON.stringify(employee),
            dataType: 'json',
            contentType: 'application/json',
        }).done(function () {
            EmployeePage.wantToCreateNewEmployee ?
                new Toast(0) : new Toast(1);
            self.loadData();
            self.closeModal();
        }).fail(function (res) {
            new Toast(res.status);
        })
    }

    //Hàm kích hoạt checkbox của từng hàng
    //Author: NQMinh(22/07/2021)
    rowActive = (self) => {
        //chọn một lượt tất cả check box để duyệt mảng
        const deleteBoxes = document.querySelectorAll('.delete-box input');
        //chọn một hàng cụ thể
        const row = $(self).children()[0];
        //chọn checkbox từ hàng đó
        const checkbox = $(row).children().children()[0];
        $(checkbox).attr('checked', !$(checkbox).attr('checked'));

        let allUnchecked = true;
        deleteBoxes.forEach(box => {
            if (box.getAttribute('checked') === 'checked') {
                allUnchecked =  false;
                Variables.buttonDelete.css('display', 'flex');
            }
            if (allUnchecked) {
                Variables.buttonDelete.css('display', 'none');
            }
        })
    }

    //#region các hàm liên quan đến xử lý validate trong form
    //Hàm kiểm tra ô nhập trống
    //Author: NQMinh(21/07/2021)
    validateRequired = () => {
        const self = this;
        const required = $('input[required]');
        // if (required.val().trim() === '') return false;
        required.blur(function () {
            if ($(this).val().trim() === '') {
                $(this).addClass('misa-input--alert');
                $(this).attr('title', 'Thông tin này bắt buộc nhập!');
                self.showError($(this), 'Thông tin này bắt buộc nhập');
                return false;
            } else {
                $(this).removeClass('misa-input--alert');
                $(this).removeAttr('title');
            }
        })

        required.on('input', function () {
            $("div").remove('.misa-bubble--alert')
        })
        return true;
    }

    //TODO: kiểm tra mã nhân viên xem có trùng không
    validateEmployeeCode = () => {

    }

    //TODO: kiểm tra định dạng email
    validateEmail = () => {
        const self = this;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        Variables.inputEmail.on('input', function() {
            const email = Variables.inputEmail.val();
            if (!re.test(String(email).toLowerCase())) {
                self.showError(Variables.inputEmail, 'Email không đúng định dạng');
                return false;
            }
        })
        return true;
    }

    //TODO: kiểm tra định dạng số điện thoại
    validatePhoneNumber = () => {

    }

    //Hàm hiện thông báo lỗi khi nhập sai input
    //@params ô nhập và text thông báo cần hiện
    //Author: NQMinh(23/07/2021)
    showError = (input, msg) => {
        const errorBubble = `<div class="misa-bubble--alert">${msg}</div>`;
        input.parent().append(errorBubble);
    }

    //Hàm validate tổng thế trước khi submit data
    validateAll = () => {
        console.log(this.validateRequired() + ' ' + this.validateEmail())
        console.log(this.validateRequired() && this.validateEmail())
        return this.validateRequired() && this.validateEmail();
    }
    //#endregion

    //Hàm xóa nhân viên
    //Author: NQMinh(24/07/2021)
    deleteEmployee = (id) => {
        try {
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${id}`,
                method: 'DELETE',
            }).done(function () {
                //xóa thành công thì ẩn cảnh báo
                Variables.alertMessage.css('display', 'none');
                //xóa thành công thì ẩn nút xóa
                Variables.buttonDelete.css('display', 'none');
            }).fail(function (res) {
                new Toast(res.status);
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Hàm render dữ liệu bảng nhân viên
    //@params dữ liệu lấy từ server
    //Author: NQMinh(17/07/2021)
    renderTable = (tableData) => {
        console.log(tableData);
        const self = this;
        tableData.forEach(employee => {
            const employeeCode = employee['EmployeeCode'];
            const fullName = employee['FullName'];
            const gender = employee['GenderName'];
            const dob = employee['DateOfBirth'];
            const phone = employee['PhoneNumber'];
            const email = employee['Email'];
            const position = employee['PositionName'];
            const department = employee['DepartmentName'];
            const salary = employee['Salary'];
            const workStatus = employee['WorkStatus'];
            const trHTML = $(`<tr tr-data="${employee['EmployeeId']}">
                        <td>
                            <div class="delete-box">
                                <input type="checkbox">
                                <span class="misa-checkmark"></span>                    
                            </div>                            
                        </td>
                        <td class="misa__table-code">${self.examineData(employeeCode)}</td>
                        <td class="misa__table-fullname">${self.examineData(fullName)}</td>
                        <td>${self.examineData(gender)}</td>
                        <td>${Utility.dateFormatter(self.examineData(dob), false)}</td>
                        <td class="misa__table-phone">${self.examineData(phone)}</td>
                        <td>${self.examineData(email)}</td>
                        <td>${self.examineData(position)}</td>
                        <td>${self.examineData(department)}</td>
                        <td>${Utility.currencyFormatter(self.examineData(salary))}</td>
                        <td>${self.examineData(workStatus)}</td>
                    </tr>`);
            $('tbody').append(trHTML);
        })
    }

    //Hàm kiểm tra thông tin có trống không
    //@params dữ liệu bất kỳ
    //@returns ' ' nếu dữ liệu không tồn tại, không thì trả về đúng dữ liệu đó
    //Author: NQMinh(17/07/2021)
    examineData = data => {
        return data ? data : '';
    }

    //Hàm thu gọn menu bên trái
    toggleMenu = () => {
        Variables.menuItemIconList.toggleClass('misa-menu__icon--shrink');
        Variables.menuItems.toggleClass('misa-menu__item--shrink');
        Variables.menuItemTextList.toggleClass('misa-hidden');
        Variables.menuToggle.toggleClass('header__toggled');
        Variables.logo.toggleClass('misa-hidden');
        Variables.headerLeft.toggleClass('misa-header--left-shrink');
        Variables.headerRight.toggleClass('misa-header--right-extend');
        Variables.menu.toggleClass('misa-menu--shrink');
        Variables.content.toggleClass('misa-content--extend');
    }

    //Hàm xử lý sự kiện paging cho table
    //Author: NQMinh(22/07/2021)
    paging = (self) => {
        Variables.paginationButtons.removeClass('active');
        $(self).toggleClass('active');

        //TODO: chức năng phân trang
    }
}