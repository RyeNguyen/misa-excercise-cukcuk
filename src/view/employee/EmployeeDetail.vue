<template>
  <div
      class="misa-modal-container"
      :class="[
          {'misa-modal-container--open': modalIsOpened},
      ]"
  >
    <vue-resizable
        class="misa-resizer"
        :class="{'misa-resizer--no-constraints': resizing}"
        :drag-selector="dragSelector"
        :active="handlers"
        :fit-parent="fit"
        :width="width"
        :height="height"
        :min-height="minHeight | checkEmpty"
        :max-height="maxHeight | checkEmpty"
        :min-width="minWidth | checkEmpty"
        :max-width="maxWidth | checkEmpty"
        :left="left"
        :top="top"
        @resize:move="ResizeAndDragHandler"
        @resize:start="ResizeAndDragHandler"
        @resize:end="ResizeAndDragHandler"
        @drag:move="ResizeAndDragHandler"
        @drag:start="ResizeAndDragHandler"
        @drag:end="ResizeAndDragHandler"
    >
      <div class="misa-modal" @click.stop.prevent>
        <div class="misa-drag-handle"/>

        <div
            class="misa-modal__button-close-container"
            @click="closeModal"
        >
          <img
              src="@/assets/icon/x.svg"
              alt="close button"
              class="misa-modal__button-close"
          >
        </div>

        <h1 class="misa-modal__header">Thông tin nhân viên</h1>

        <div class="misa-modal__content">
          <div class="misa-modal__img-picker">
            <div style="display: flex; flex-direction: column; align-items: start; width: 100%">
              <div class="img-picker__placeholder"></div>
              <div class="img-picker__text">(Vui lòng chọn ảnh có định <br> dạng .jpg, .jpeg, .png, .gif.)</div>
            </div>
          </div>

          <div class="misa-modal__form">
            <!-- Thông tin chung -->
            <div class="misa-modal__info">
              <h2 class="info__title">a. thông tin chung:</h2>
              <div class="misa__divider"></div>

              <div class="misa-modal__fields">
                <!-- Nhập mã nhân viên ở đây -->
                <MisaPopupModalField
                    fieldLabel="Mã nhân viên"
                    fieldId="input-employee-code"
                    :isRequired="true"
                >
                    <input
                        ref="inputCode"
                        slot="misa-text-box"
                        class="misa-text-box--default"
                        type="text" id="input-employee-code"
                        v-model="employee['EmployeeCode']"
                        required
                    />
                </MisaPopupModalField>

                <!-- Nhập tên ở đây -->
                <MisaPopupModalField
                    fieldLabel="Họ và tên"
                    fieldId="input-employee-name"
                    :isRequired="true"
                >
                    <input
                        slot="misa-text-box"
                        class="misa-text-box--default"
                        type="text"
                        id="input-employee-name"
                        v-model="employee['FullName']"
                        required
                    />
                </MisaPopupModalField>

                <!-- Nhập ngày sinh ở đây -->
                <MisaPopupModalField
                    fieldLabel="Ngày sinh"
                    fieldId="input-employee-dob"
                    :isRequired="false"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="date"
                      id="input-employee-date-born"
                      v-model="employee['DateOfBirth']"
                  />
                </MisaPopupModalField>

                <!-- Nhập giới tính ở đây -->
                <MisaPopupModalField
                    fieldLabel="Giới tính"
                    :isRequired="false"
                >
                  <MisaDropdown
                      slot="misa-text-box"
                      ref="dropdownGender"
                      id="dropdown__gender"
                      title="Chọn giới tính"
                      type="Gender"
                  />
                </MisaPopupModalField>

                <!-- Nhập CMT ở đây -->
                <MisaPopupModalField
                    fieldLabel="Số CMTND/Căn cước"
                    fieldId="input-employee-id"
                    :isRequired="true"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      id="input-employee-id"
                      v-model="employee['IdentityNumber']"
                      required
                  />
                </MisaPopupModalField>

                <!-- Nhập ngày cấp CMT ở đây -->
                <MisaPopupModalField
                    fieldLabel="Ngày cấp"
                    fieldId="input-employee-id-date"
                    :isRequired="false"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="date"
                      id="input-employee-id-date"
                      v-model="employee['IdentityDate']"
                  />
                </MisaPopupModalField>

                <!-- Nhập nơi cấp CMT ở đây -->
                <MisaPopupModalField
                    fieldLabel="Nơi cấp"
                    fieldId="input-employee-id-place"
                    :isRequired="false"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="text"
                      id="input-employee-id-place"
                      v-model="employee['IdentityPlace']"
                  />
                </MisaPopupModalField>
              </div>

              <div class="misa-modal__fields">
                <!-- Nhập email ở đây -->
                <MisaPopupModalField
                    fieldLabel="Email"
                    fieldId="input-employee-email"
                    :isRequired="true"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="email" id="input-employee-email"
                      v-model="employee['Email']"
                      required
                  />
                </MisaPopupModalField>

                <!-- Nhập SĐT ở đây -->
                <MisaPopupModalField
                    fieldLabel="Số điện thoại"
                    fieldId="input-employee-phone"
                    :isRequired="true"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="tel"
                      id="input-employee-phone"
                      v-model="employee['PhoneNumber']"
                      required
                  />
                </MisaPopupModalField>
              </div>
            </div>

            <!-- Thông tin công việc -->
            <div class="misa-modal__info">
              <h2 class="info__title">b. thông tin công việc:</h2>
              <div class="misa__divider"></div>

              <div class="misa-modal__fields">
                <!-- Nhập vị trí ở đây -->
                <MisaPopupModalField
                    fieldLabel="Vị trí"
                    :isRequired="false"
                >
                  <MisaDropdown
                      slot="misa-text-box"
                      ref="dropdownPosition"
                      id="dropdown__position-modal"
                      title="Chọn vị trí"
                      type="Position"
                  />
                </MisaPopupModalField>

                <!-- Nhập phòng ban ở đây -->
                <MisaPopupModalField
                    fieldLabel="Phòng ban"
                    :isRequired="false"
                >
                  <MisaDropdown
                      slot="misa-text-box"
                      ref="dropdownDepartment"
                      id="dropdown__department-modal"
                      title="Chọn phòng ban"
                      type="Department"
                  />
                </MisaPopupModalField>

                <!-- Nhập mã số thuế ở đây -->
                <MisaPopupModalField
                    fieldLabel="Mã số thuế cá nhân"
                    fieldId="input-employee-tax"
                    :isRequired="false"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="text"
                      id="input-employee-wage"
                      v-model="employee['PersonalTaxCode']"
                  />
                </MisaPopupModalField>

                <!-- Nhập lương ở đây -->
                <MisaPopupModalField
                    fieldLabel="Mức lương cơ bản"
                    fieldId="input-employee-income"
                    :isRequired="false"
                >
                  <div id="income-container" slot="misa-text-box">
                    <input
                        class="misa-text-box--default"
                        type="text"
                        id="input-employee-income"
                        v-model="employee['Salary']"
                    />
                    <div id="income-container__label">VNĐ</div>
                  </div>
                </MisaPopupModalField>

                <!-- Nhập ngày vào công ty ở đây -->
                <MisaPopupModalField
                    fieldLabel="Ngày gia nhập công ty"
                    fieldId="input-employee-date-company"
                    :isRequired="false"
                >
                  <input
                      slot="misa-text-box"
                      class="misa-text-box--default"
                      type="date"
                      id="input-employee-date-company"
                  />
                </MisaPopupModalField>

                <!-- Nhập tình trạng làm việc ở đây -->
                <MisaPopupModalField
                    fieldLabel="Tình trạng làm việc"
                    :isRequired="false"
                >
                  <MisaDropdown
                      slot="misa-text-box"
                      ref="dropdownWorkStatus"
                      id="dropdown__work-status"
                      title="Tình trạng làm việc"
                      type="WorkStatus"
                  />
                </MisaPopupModalField>
              </div>
            </div>
          </div>
        </div>

        <div class="misa-modal__footer">
          <MisaButton
              buttonId="button__cancel"
              buttonType="secondary"
              buttonText="Hủy"
              @click.native="closeModal"
          />

          <MisaButton
              buttonId="button__submit"
              buttonType="primary"
              buttonText="Lưu"
              buttonIconFontAwesome="far fa-save"
              @click.native="submitData"
          />
        </div>
      </div>
    </vue-resizable>
  </div>
</template>

<script>
import VueResizable from 'vue-resizable';

import EmployeesAPI from "@/api/components/EmployeesAPI";

//#region import utils
// import DataValidator from "@/utils/DataValidator";
import Toast from "@/utils/ToastsCreator";
import CurrencyFormatter from "@/utils/CurrencyFormatter";
import DateFormatter from "@/utils/DateFormatter";
//#endregion

import MisaPopupModalField from "@/components/base/MisaPopupModalField";

export default {
  name: "EmployeeDetail",

  //#region mounted
  mounted() {
    // DataValidator.validateAll();
    this.$refs.inputCode.focus();
  },
  //#endregion

  //#region data
  data() {
    //Kích thước form mặc định
    const resizerWidth = 820;
    const resizerHeight = 730;

    return {
      //Biến kiểm tra modal có mở hay không
      showModal: this.modalIsOpened,

      //Biến chứa dữ liệu nv để thêm hoặc sửa
      employee: {},

      resizing: false,

      //#region Các thông số cần thiết để thực hiện resize form
      handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
      left: `calc(50% - ${resizerWidth / 2}px)`,
      top: `calc(50% - ${resizerHeight / 2}px)`,
      height: resizerHeight,
      width: resizerWidth,
      minHeight: 514,
      minWidth: 730,
      maxHeight: 730,
      maxWidth: 1080,
      dragSelector: '.misa-drag-handle',
      fit: true,
      //#endregion
    }
  },
  //#endregion

  //#region props
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
  //#endregion

  //#region components
  components: {
    MisaPopupModalField,
    VueResizable
  },
  //#endregion

  //#region watch
  watch: {
    //Hàm kiểm tra user muốn thêm nv hay không -> thêm mã nv mới
    //Author: NQMinh(31/07/2021)
    modalIsOpened: function () {
      if (this.wantToCreateNewEmployee) {
        this.employee['EmployeeCode'] = this.newEmployeeCode;
      }

      this.$nextTick(() => {
        this.$refs.inputCode.focus();
      })
    },

    //Hàm kiểm tra user muốn sửa thông tin nv hay không -> binding data
    //Author: NQMinh(31/07/2021)
    wantToCreateNewEmployee: function () {
      if (!this.wantToCreateNewEmployee) {
        this.employee = this.employeeData;

        this.bindingDropdown(this.$refs.dropdownPosition, this.$positionData, 'Position');
        this.bindingDropdown(this.$refs.dropdownDepartment, this.$departmentData, 'Department');
        this.bindingDropdown(this.$refs.dropdownGender, this.$genderData, 'Gender');
        this.bindingDropdown(this.$refs.dropdownWorkStatus, this.$workStatusData, 'WorkStatus')

        this.employee['DateOfBirth'] = this.formatDate(this.employee['DateOfBirth']);
        this.employee['IdentityDate'] = this.formatDate(this.employee['IdentityDate']);
      }
    },

    //Watcher kiểm tra sự thay đổi của tiền lương để định dạng khi nhập
    //Author: NQMinh(06/08/2021)
    'employee.Salary': function (salary) {
      let formatted = String(salary).replaceAll('.', '');
      this.employee['Salary'] = this.formatSalary(formatted);
    }
  },
  //#endregion

  emits: ['close-modal', 'modal-submitted'],

  filters: {
    /**
     * Kiểm tra dữ liệu kích thước form
     */
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    }
  },

  //#region methods
  methods: {
    bindingDropdown(refName, data, type) {
      let dropdownIndex = data.findIndex(el => el[`${type}Id`] === this.employee[`${type}Id`]);
      if (type === 'Gender' || type === 'WorkStatus') {
        dropdownIndex = data.findIndex(el => el[`${type}Id`] === this.employee[`${type}`]);
      }
      refName.$children[0].currentIndex = dropdownIndex;
      refName.dropdownTitle = data[dropdownIndex][`${type}Name`];
      refName.value = this.employee[`${type}Id`];
    },

    resetDropdown(refName, defaultTitle) {
      refName.$children[0].currentIndex = -1;
      refName.dropdownTitle = defaultTitle;
      refName.value = '';
    },

    /**
     * Hàm xử lý sự kiện thay đổi kích thước và kéo thả form nhập
     * @params dữ liệu sự kiện
     * Author: NQMinh (05/08/2021)
     */
    ResizeAndDragHandler(data) {
      this.width = data.width;
      this.height = data.height;
      this.left = data.left;
      this.top = data.top;
      setTimeout(() => {
        this.resizing = true;
      }, 700)
    },

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
      //Chọn ra các input và các popup msg
      const inputsList = document.querySelectorAll('.misa-text-box--default');
      const alertBubbles = document.querySelectorAll('.misa-bubble--alert');
      //Bỏ viền đỏ của input
      inputsList.forEach(input => {
        input.classList.remove('misa-input--alert');
      });
      //Bỏ đi các popup msg
      alertBubbles.forEach(bubble => bubble.remove());
      //Clear dữ liệu
      this.employee = {};

      this.resetDropdown(this.$refs.dropdownPosition, 'Chọn vị trí');
      this.resetDropdown(this.$refs.dropdownDepartment, 'Chọn phòng ban');
      this.resetDropdown(this.$refs.dropdownGender, 'Chọn giới tính');
      this.resetDropdown(this.$refs.dropdownWorkStatus, 'Tình trạng làm việc');

      this.showModal = false;
      this.$emit('close-modal', this.showModal);
    },

    //Hàm lưu dữ liệu nv lên database
    //Author: NQMinh(30/07/2021)
    submitData() {
      this.employee['DateOfBirth'] = this.employee['DateOfBirth'] ? this.employee['DateOfBirth'] : null;

      this.employee['Gender'] = parseInt(this.$refs.dropdownGender.value);

      this.employee['IdentityDate'] = this.employee['IdentityDate'] ? this.employee['IdentityDate'] : null;

      this.employee['PositionId'] = this.$refs.dropdownPosition.value ?
          this.$refs.dropdownPosition.value :
          null;

      this.employee['DepartmentId'] = this.$refs.dropdownDepartment.value ?
          this.$refs.dropdownDepartment.value :
          null;

      this.employee['JoinDate'] = this.employee['JoinDate'] ? this.employee['JoinDate'] : null;

      this.employee['WorkStatus'] = parseInt(this.$refs.dropdownWorkStatus.value);

      this.employee['Salary'] = this.employee['Salary'] ?
          parseInt(this.employee['Salary'].split('.').join('')) :
          parseInt(this.employee['Salary']);

      if (this.wantToCreateNewEmployee) {
        this.addEmployee();
      } else {
        this.updateEmployee();
      }
      this.closeModal();
      this.employee = {};
    },

    /**
     * Hàm call API để thêm dữ liệu nv lên server
     * Author: NQMinh(03/08/2021)
     */
    addEmployee() {
      EmployeesAPI.add(this.employee).then(() => {
        new Toast(0);
        this.$emit('modal-submitted');
      }).catch(error => {
        new Toast(error.response.status);
      })
    },

    /**
     * Hàm call API để sửa đổi dữ liệu nv
     * Author: NQMinh(03/08/2021)
     */
    updateEmployee() {
      EmployeesAPI.update(this.employee['EmployeeId'], this.employee).then(() => {
        new Toast(1);
        this.$emit('modal-submitted');
      }).catch(error => {
        new Toast(error.response.status);
      })
    }
  }
  //#endregion
}
</script>

<style lang="scss" scoped>
.misa-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  //align-items: center;
  //justify-content: space-evenly;

  &--open {
    display: flex;
  }
}

.misa-drag-handle {
  width: 48px;
  height: 8px;
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 16px;
  background-color: var(--color-secondary);
  cursor: move;
}

.misa-resizer {
  background-position: top left;
  width: auto;
  height: auto;
  position: relative;
  margin: auto;

  &--no-constraints {
    margin: 0;
  }
}

.misa-modal {
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  padding: 24px;
  position: relative;

  &__button-close-container {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  &__header {
    text-transform: uppercase;
  }

  &__content {
    height: 100%;
    margin-top: 24px;
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  &__img-picker {
    width: 30%;

    & .img-picker__placeholder {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid var(--color-hightlight);
      background-image: url('../../assets/img/default-avatar.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    & .img-picker__text {
      width: 70%;
      margin: 4px auto;
      font-size: 11px;
    }
  }

  &__form {
    width: 75%;
    height: 84%;
    overflow: auto;
    padding: 0 8px 48px 0;

    & .info__title {
      text-transform: uppercase;
    }

    & .misa__divider {
      width: 80px;
      height: 4px;
      background-color: var(--color-primary);
      margin: 8px 0 16px;
    }
  }

  &__info {
    margin-bottom: 16px;
  }

  &__footer {
    width: 100%;
    padding: 8px 24px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & .misa-button--primary {
      margin-left: 16px;
    }

    & .misa-button--secondary {
      border: none;
    }
  }
}

#income-container {
  position: relative;

  & input {
    text-align: right;
    padding-right: 52px;
  }

  &__label {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-style: italic;
  }
}

@media screen and (max-width: 1080px) {
  .misa-resizer {
    width: 90%;
  }
}
</style>