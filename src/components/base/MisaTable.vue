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
          ref="tableRow"
          v-for="(employee, index) in filteredData"
          :key="employee['EmployeeId']"
          @click="rowActive(index)"
          @dblclick="bindingDataFromTable(employee)"
      >
        <td>
          <div class="delete-box">
            <input
                ref="deleteBox"
                type="checkbox"
                :value="employee['EmployeeId']"
            >
            <span class="misa-checkmark"></span>
          </div>
        </td>
        <td>{{ employee['EmployeeCode'] }}</td>
        <td>{{ employee['FullName'] }}</td>
        <td>{{ employee['GenderName'] }}</td>
        <td>{{ formatDate(employee['DateOfBirth']) }}</td>
        <td>{{ employee['PhoneNumber'] }}</td>
        <td>{{ employee['Email'] }}</td>
        <td>{{ employee['PositionName'] }}</td>
        <td>{{ employee['DepartmentName'] }}</td>
        <td>{{ formatSalary(employee['Salary']) }}</td>
        <td>{{ employee['WorkStatus'] }}</td>
      </tr>
      </tbody>
    </table>
    <Loading
        color="#019160"
        :height=64
        :width=64
        loader="spinner"
        :z-index=17
        blur="4px"
        :active="isLoading"
        :can-cancel="false"
        :is-full-page="false"
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

  created() {
    this.filteredData = this.data;
  },

  data() {
    return {
      showModal: true,
      wantToCreateNewEmployee: false,
      employeesToDelete: [],
      filteredData: []
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
    },

    searchKeyword: {
      type: String
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
    data: function () {
      this.filteredData = this.data;
      this.employeesToDelete = [];
    },

    searchKeyword: function () {
      this.filteredData = this.data.filter(item => {
        return (item['FullName'].toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            item['EmployeeCode'].toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            item['PhoneNumber'].includes(this.searchKeyword)
        );
      })
    }
  },

  methods: {
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

    //TODO: Hàm phức tạp và khó hiểu
    /**
     * Hàm kích hoạt checkbox khi click vào mỗi hàng
     * @param index
     * Author: NQMinh(31/07/2021)
     */
    rowActive(index) {
      this.$refs.deleteBox[index].defaultChecked = !this.$refs.deleteBox[index].defaultChecked;
      if (this.$refs.deleteBox[index].defaultChecked) {
        this.employeesToDelete.push(this.$refs.deleteBox[index].defaultValue);
      } else {
        if (this.employeesToDelete.indexOf(this.$refs.deleteBox[index].defaultValue) > -1) {
          this.employeesToDelete.splice(this.employeesToDelete.indexOf(this.$refs.deleteBox[index].defaultValue), 1);
        }
      }
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
}

.misa-content__table {
  width: 100%;
  min-width: 1366px;
  text-align: left;
  font-weight: normal;
  position: relative;
  border-collapse: collapse;
  background-color: var(--color-white);

  & .table__header th {
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    z-index: 6;

    &:first-child {
      min-width: 80px;
      max-width: 100px;
      padding-left: 16px;
    }

    &:nth-child(10) {
      text-align: right;
      padding-right: 24px;
    }
  }

  & tr {
    height: 40px;
    border-bottom: 1px solid var(--color-hightlight);
  }

  & tbody tr {
    cursor: pointer;

    &:hover {
      background-color: var(--color-secondary-hover);
    }

    //&:nth-child(odd) {
    //  background-color: rgba(229, 229, 229, 0.5);
    //}
  }

  /*#region chỉnh size của table*/
  & td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 24px;

    &:first-child {
      min-width: 80px;
      max-width: 100px;
      padding-left: 16px;
    }

    &:nth-child(2) {
      min-width: 100px;
    }

    &:nth-child(3) {
      min-width: 150px;
    }

    &:nth-child(4) {
      min-width: 150px;
    }

    &:nth-child(5) {
      min-width: 150px;
    }

    &:nth-child(6) {
      min-width: 100px;
    }

    &:nth-child(7) {
      min-width: 200px;
      max-width: 350px;
    }

    &:nth-child(8) {
      min-width: 150px;
    }

    &:nth-child(9) {
      min-width: 150px;
    }

    &:nth-child(10) {
      min-width: 150px;
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
    width: 24px;
    height: 24px;
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
      width: 24px;
      height: 24px;
      margin: 0;
      top: 0;
      left: 0;
      z-index: 3;
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
      height: 24px;
      width: 24px;
      //background-color: var(--color-secondary-hover);
      background-color: var(--color-white);

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    //&:hover input ~ .misa-checkmark {
    //  background-color: var(--color-hightlight);
    //}
  }

  /*#endregion*/
}

.misa-row {
  &--active {
    background-color: var(--color-hightlight);
  }
}
</style>