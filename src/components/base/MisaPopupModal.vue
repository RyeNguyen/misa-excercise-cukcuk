<template>
  <div
      class="misa-modal-container"
      :class="{'misa-modal-container--open': modalIsOpened}"
      @click="closeModal"
  >
    <div class="misa-modal" @click.stop.prevent>
      <img src="../../assets/icon/x.svg" alt="close button" class="misa-modal__button-close" @click="closeModal">

      <h1 class="misa-modal__header">Thông tin nhân viên</h1>

      <div class="misa-modal__content">
        <div class="misa-modal__img-picker">
          <div style="display: flex; flex-direction: column; align-items: center; width: 80%">
            <div class="img-picker__placeholder"></div>
            <div class="img-picker__text">(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif.)</div>
          </div>
        </div>

        <div class="misa-modal__form">
          <!-- Thông tin nhân viên -->
          <div class="misa-modal__info">
            <h2 class="info__title">a. thông tin chung:</h2>
            <div class="misa__divider"></div>

            <div class="misa-modal__fields">
              <!-- Nhập mã nhân viên ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-code" class="misa-label-text">
                  Mã nhân viên (<span class="misa__asterisk">*</span>)
                </label>
                <input
                    class="misa-text-box--default"
                    type="text" id="input-employee-code"
                    v-model="employee['EmployeeCode']"
                    required
                />
              </div>

              <!-- Nhập tên ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-name" class="misa-label-text">
                  Họ và tên (<span class="misa__asterisk">*</span>)
                </label>
                <input
                    class="misa-text-box--default"
                    type="text"
                    id="input-employee-name"
                    v-model="employee['FullName']"
                    required
                />
              </div>

              <!-- Nhập ngày sinh ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-date-born" class="misa-label-text">
                  Ngày sinh
                </label>
                <input
                    class="misa-text-box--default"
                    type="date"
                    id="input-employee-date-born"
                    v-model="employee['DateOfBirth']"
                />
              </div>

              <!-- Nhaaph giới tính ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Giới tính
                </label>
                <MisaDropdown
                    id="dropdown__gender"
                    title="Chọn giới tính"
                    type="Position"
                />
              </div>

              <!-- Nhập CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id" class="misa-label-text">
                  Số CMTND/Căn cước (<span class="misa__asterisk">*</span>)
                </label>
                <input
                    class="misa-text-box--default"
                    id="input-employee-id"
                    v-model="employee['IdentityNumber']"
                    required
                />
              </div>

              <!-- Nhập ngày cấp CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id-date" class="misa-label-text">
                  Ngày cấp
                </label>
                <input
                    class="misa-text-box--default"
                    type="date"
                    id="input-employee-id-date"
                    v-model="employee['IdentityDate']"
                />
              </div>

              <!-- Nhập nơi cấp CMT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-id-place" class="misa-label-text">
                  Nơi cấp
                </label>
                <input
                    class="misa-text-box--default"
                    type="text"
                    id="input-employee-id-place"
                    v-model="employee['IdentityPlace']"
                />
              </div>
            </div>

            <div class="misa-modal__fields">
              <!-- Nhập email ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-email" class="misa-label-text">
                  Email (<span class="misa__asterisk">*</span>)
                </label>
                <input
                    class="misa-text-box--default"
                    type="email" id="input-employee-email"
                    v-model="employee['Email']"
                    required/>
              </div>

              <!-- Nhập SĐT ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-phone" class="misa-label-text">
                  Số điện thoại (<span class="misa__asterisk">*</span>)
                </label>
                <input
                    class="misa-text-box--default"
                    type="tel"
                    id="input-employee-phone"
                    v-model="employee['PhoneNumber']"
                    required />
              </div>
            </div>
          </div>

          <!-- Thông tin công việc -->
          <div class="misa-modal__info">
            <h2 class="info__title">b. thông tin công việc:</h2>
            <div class="misa__divider"></div>

            <div class="misa-modal__fields">
              <!-- Nhập vị trí ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Vị trí
                </label>
                <MisaDropdown
                    id="dropdown__position-modal"
                    title="Chọn vị trí"
                    type="Position"
                />
              </div>

              <!-- Nhập phòng ban ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Phòng ban
                </label>
                <MisaDropdown
                    id="dropdown__department-modal"
                    title="Chọn phòng ban"
                    type="Position"
                />
              </div>

              <!-- Nhập mã số thuế ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-wage" class="misa-label-text">
                  Mã số thuế cá nhân
                </label>
                <input
                    class="misa-text-box--default"
                    type="text"
                    id="input-employee-wage"
                    v-model="employee['PersonalTaxCode']"
                />
              </div>

              <!-- Nhập lương ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-income" class="misa-label-text">
                  Mức lương cơ bản
                </label>
                <div id="income-container">
                  <input
                      class="misa-text-box--default"
                      type="text"
                      id="input-employee-income"
                      v-model="employee['Salary']"
                  />
                  <div id="income-container__label">VNĐ</div>
                </div>
              </div>

              <!-- Nhập ngày vào công ty ở đây -->
              <div class="misa-modal__field">
                <label for="input-employee-date-company" class="misa-label-text">
                  Ngày gia nhập công ty
                </label>
                <input
                    class="misa-text-box--default"
                    type="date"
                    id="input-employee-date-company"
                />
              </div>

              <!-- Nhập tình trạng làm việc ở đây -->
              <div class="misa-modal__field">
                <label class="misa-label-text">
                  Tình trạng làm việc
                </label>
                <MisaDropdown
                    id="dropdown__work-status"
                    title="Tình trạng làm việc"
                    type="Position"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="misa-modal__footer">
        <div class="misa-button" id="button__cancel" @click="closeModal">Hủy</div>
        <div class="misa-button misa-button__icon" id="button__submit" @click="submitData">
          <div class="button__icon"><i class="far fa-save"></i></div>
          <div class="button__text">Lưu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import CurrencyFormatter from "@/utils/CurrencyFormatter";
import DateFormatter from "@/utils/DateFormatter";

import MisaDropdown from "@/components/base/dropdown/MisaDropdown";

export default {
  name: "MisaPopupModal",

  data() {
    return {
      //Biến kiểm tra modal có mở hay không
      showModal: this.modalIsOpened,

      //Biến chứa dữ liệu nv để thêm hoặc sửa
      employee: {
        // "EmployeeId": "f44d3bec-ea01-11eb-94eb-42010a8c0002",
        // "EmployeeCode": this.newEmployeeCode,
        // "FirstName": null,
        // "LastName": null,
        // "FullName": null,
        // "Gender": 1,
        // "DateOfBirth": "3232-12-03",
        // "PhoneNumber": "21423524124",
        // "Email": "DTH@gmail.com",
        // "Address": null,
        // "IdentityNumber": "123124134230",
        // "IdentityDate": "3333-12-03",
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
        // "CreatedDate": "2021-07-21",
        // "CreatedBy": null,
        // "ModifiedDate": "2021-07-21",
        // "ModifiedBy": null
      }
    }
  },
  props: {
    //Biến dữ liệu cá nhân một nv khi click 2 lần vào table row
    employeeData: Object,

    //Biến kiểm tra modal có mở hay không
    modalIsOpened: {
      type: Boolean,
      required: true
    },

    //Biến chứa mã nv mới gọi từ API
    newEmployeeCode: {
      required: true
    },

    //Biến kiểm tra xem người dùng muốn thêm hay sửa thông tin nv
    wantToCreateNewEmployee: {
      type: Boolean,
      required: true,
      default: true
    }
  },

  components: {
    MisaDropdown
  },

  watch: {
    //Hàm kiểm tra user muốn thêm nv hay không -> thêm mã nv mới
    //Author: NQMinh(31/07/2021)
    modalIsOpened: function() {
      if (this.wantToCreateNewEmployee) {
        this.employee['EmployeeCode'] = this.newEmployeeCode;
      }
    },

    //Hàm kiểm tra user muốn sửa thông tin nv hay không -> binding data
    //Author: NQMinh(31/07/2021)
    wantToCreateNewEmployee: function() {
      if (!this.wantToCreateNewEmployee) {
        this.employee = this.employeeData;
        this.employee['DateOfBirth'] = this.formatDate(this.employee['DateOfBirth']);
        this.employee['IdentityDate'] = this.formatDate(this.employee['IdentityDate']);
        this.employee['Salary'] = this.formatSalary(this.employee['Salary']);
      } else {
        this.employee = {};
      }
    }
  },

  emits: ['btn-close-clicked'],

  methods: {
    //Hàm định dạng mức lương
    //Author: NQMinh(30/07/2021)
    formatSalary(salary) {
      return CurrencyFormatter.format(salary);
    },

    //Hàm định dạng ngày tháng
    //Author: NQMinh(30/07/2021)
    formatDate(date) {
      return DateFormatter.format(date, true);
    },

    //Hàm ẩn form thêm/sửa nhân viên
    //Author: NQMinh(29/07/2021)
    closeModal() {
      this.showModal = false;
      this.$emit('btn-close-clicked', this.showModal);
    },

    //Hàm lưu dữ liệu nv lên database
    //Author: NQMinh(30/07/2021)
    submitData() {
      console.log(this.employee);
      axios.post('http://cukcuk.manhnv.net/v1/Employees', this.employee).then(res => {
        console.log(res);
      }).catch(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
@import url('../../css/base/Modal.css');

.misa-modal-container--open {
  display: flex;
}
</style>