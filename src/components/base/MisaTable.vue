<template>
  <div class="misa-content__table-container">
    <table v-if="!isLoading" class="misa-content__table">
      <thead>
      <tr class="table__header">
        <th>
          <div class="delete-box">
            <input type="checkbox">
            <span class="misa-checkmark"></span>
          </div>
        </th>
        <th>Mã nhân viên</th>
        <th>Họ và tên</th>
        <th>Giới tính</th>
        <th>Ngày sinh</th>
        <th>Điện thoại</th>
        <th>Email</th>
        <th>Chức vụ</th>
        <th>Phòng ban</th>
        <th>Mức lương cơ bản</th>
        <th>Tình trạng công việc</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(employee, index) in data"
          :key="employee['EmployeeId']"
          ref="tableRow"
          @click="rowActive(index)"
          @dblclick="bindingDataFromTable(employee)"
      >
        <td>
          <div class="delete-box">
            <input
                ref="deleteBox"
                :value="employee['EmployeeId']"
                type="checkbox"
            >
            <span class="misa-checkmark"></span>
          </div>
        </td>
        <td>{{ employee['EmployeeCode'] }}</td>
        <td>{{ employee['FullName'] }}</td>
        <td>{{ roleNameIdentify('Gender', employee['Gender']) }}</td>
        <td>{{ formatDate(employee['DateOfBirth']) }}</td>
        <td>{{ employee['PhoneNumber'] }}</td>
        <td>{{ employee['Email'] }}</td>
        <td>{{ roleNameIdentify('Position', employee['PositionId']) }}</td>
        <td>{{ roleNameIdentify('Department', employee['DepartmentId']) }}</td>
        <td>{{ formatSalary(employee['Salary']) }}</td>
        <td>{{ roleNameIdentify('WorkStatus', employee['WorkStatus']) }}</td>
      </tr>
      </tbody>
    </table>
    <Loading
        :active="isLoading"
        :can-cancel="false"
        :height=64
        :is-full-page="false"
        :width=64
        :z-index=17
        blur="4px"
        color="#019160"
        loader="spinner"
    />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import EmployeesAPI from "@/api/components/EmployeesAPI";

import Toast from "@/utils/ToastsCreator";
import CurrencyFormatter from "@/utils/CurrencyFormatter";
import DateFormatter from "@/utils/DateFormatter";

export default {
  name: 'MisaTable',

  data() {
    return {
      showModal: true,
      wantToCreateNewEmployee: false,
      employeesToDelete: [],
      filteredData: this.data,
    }
  },

  props: {
    data: {
      type: Array,
      required: true
    },

    isLoading: {
      type: Boolean,
      required: true
    }
  },

  components: {
    Loading
  },

  emits: [
    'row-double-clicked',
    'show-btn-delete',
    'hide-btn-delete'
  ],

  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function () {

      }
    }
  },

  methods: {
    roleNameIdentify: function (role, entityId) {
      let data;
      if (role === 'Gender') data = this.$genderData;
      if (role === 'Department') data = this.$departmentData;
      if (role === 'Position') data = this.$positionData;
      if (role === 'WorkStatus') data = this.$workStatusData;
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i][`${role}Id`] === entityId) {
            return data[i][`${role}Name`];
          }
        }
      }
    },

    /**
     * Hàm định dạng mức lương
     * @param salary
     * @returns {string|string}
     * Author: NQMinh(30/07/2021)
     */
    formatSalary(salary) {
      return CurrencyFormatter.format(salary);
    },

    /**
     * Hàm định dạng ngày tháng
     * @param date
     * @returns {string}
     * Author: NQMinh(30/07/2021)
     */
    formatDate(date) {
      return DateFormatter.format(date, false);
    },

    /**
     * Hàm truyền dữ liệu từ table vào modal
     * @param employee
     * Author: NQMinh(30/07/2021)
     */
    bindingDataFromTable(employee) {
      EmployeesAPI.getById(employee['EmployeeId']).then(res => {
        new Toast('okay');
        this.$emit(
            'row-double-clicked',
            this.showModal,
            res.data,
            this.wantToCreateNewEmployee
        );
      }).catch(error => {
        new Toast(error.response.status);
      })
    },

    //TODO: Hàm phức tạp
    /**
     * Hàm kích hoạt checkbox khi click vào mỗi hàng
     * @param index
     * Author: NQMinh(31/07/2021)
     */
    rowActive(index) {
      //Khi hàng thứ index được click thì checkbox thứ index cũng được kích hoạt
      this.$refs.tableRow[index].classList.toggle('table-row--active');

      //Đổi màu hàng thứ index thành active
      this.$refs.deleteBox[index].defaultChecked = !this.$refs.deleteBox[index].defaultChecked;

      //Nếu như checkbox thứ index kích hoạt thì đẩy id nv hàng đó vào mảng xóa
      if (this.$refs.deleteBox[index].defaultChecked) {
        this.employeesToDelete.push(this.filteredData[index]);
      } else {
        //Nếu như không còn kích hoạt nữa thì kiếm tra mã nv đó có trong mảng xóa không, nếu có thì xóa khỏi mảng
        if (this.employeesToDelete.indexOf(this.filteredData[index]) > -1) {
          this.employeesToDelete.splice(this.employeesToDelete.indexOf(this.filteredData[index]), 1);
        }
      }
      //Hiện nút xóa
      this.showButtonDelete();
    },

    /**
     * Kiểm tra các checkbox được kích hoạt chưa để hiện nút xóa
     Author: NQMinh(31/07/2021)
     */
    showButtonDelete() {
      //List toàn bộ checkbox
      const checkboxList = this.$refs.deleteBox;
      //Biến kiểm tra có checkbox nào được kích hoạt không
      let allUnchecked = true;

      //Nếu có ít nhất 1 checkbox được kích hoạt thì hiện nút xóa
      checkboxList.forEach(checkbox => {
        if (checkbox.defaultChecked === true) {
          allUnchecked = false;
        }
      })
      if (!allUnchecked) {
        this.$emit('show-btn-delete', this.employeesToDelete);
      } else {
        this.$emit('hide-btn-delete');
      }
    }
  }
}
</script>

<style lang="scss">
/*
Text căn trái
tiền căn phải
date căn giữa
*/
.misa-content__table-container {
  width: 100%;
  height: calc(100vh - 240px);
  margin-top: 16px;
  overflow: auto;
  background-color: var(--color-white);

  &::-webkit-scrollbar-track {
    background-color: var(--color-white);
    border-radius: 16px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: var(--color-secondary);
    margin-top: 40px;
  }
}

.misa-content__table {
  width: 100%;
  min-width: 1366px;
  text-align: left;
  font-weight: normal;
  position: relative;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--color-white);

  & .table__header th {
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    z-index: 6;
    border-bottom: 1px solid var(--color-secondary-hover);

    &:first-child {
      min-width: 48px;
      padding-left: 16px;
    }

    &:nth-child(5) {
      text-align: center;
    }

    &:nth-child(10) {
      text-align: right;
      padding-right: 24px;
    }
  }

  & tr {
    height: 40px;
    border-bottom: 1px solid var(--color-secondary-hover);
    transition: all 0.07s ease-in-out;

    &:last-child {
      border-bottom: none;
    }
  }

  & tbody tr {
    cursor: pointer;

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }

  & .table-row--active {
    background-color: var(--color-primary-focus);

    &:hover {
      background-color: var(--color-primary-focus);
    }
  }

  /*#region chỉnh size của table*/
  & td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 24px;
    border-bottom: 1px solid var(--color-secondary-hover);

    &:first-child {
      padding-left: 16px;
      padding-right: 0;
      margin: 0;
    }

    &:nth-child(2) {
      min-width: 100px;
    }

    &:nth-child(3) {
      min-width: 150px;
      max-width: 250px;
    }

    &:nth-child(4) {
      min-width: 100px;
    }

    &:nth-child(5) {
      min-width: 150px;
      text-align: center;
      padding: 0;
    }

    &:nth-child(6) {
      min-width: 100px;
    }

    &:nth-child(7) {
      min-width: 150px;
      max-width: 250px;
    }

    &:nth-child(8) {
      min-width: 150px;
    }

    &:nth-child(9) {
      min-width: 150px;
    }

    &:nth-child(10) {
      min-width: 150px;
      max-width: 250px;
      text-align: right;
      padding-right: 24px;
    }

    &:last-child {
      min-width: 150px;
    }
  }

  /*#endregion*/

  /*#region checkbox*/
  & .delete-box {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    overflow: hidden;
    border: 0.1px solid var(--color-hightlight);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;

    & input {
      position: absolute;
      opacity: 0;
      width: 20px;
      height: 20px;
      margin: 0;
      top: 0;
      left: 0;
      z-index: 3;
      pointer-events: none;
      cursor: pointer;

      &:checked ~ .misa-checkmark {
        background-color: var(--color-primary);

        &:after {
          display: block;
        }
      }
    }

    & .misa-checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: var(--color-white);

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 3px;
        height: 9px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  /*#endregion*/
}

.misa-row {
  &--active {
    background-color: var(--color-hightlight);
  }
}
</style>