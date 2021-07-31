<template>
  <div class="misa-content__table-container">
    <table class="misa-content__table">
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
          v-for="(employee, index) in tableData"
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
        <td>{{employee['EmployeeCode']}}</td>
        <td>{{employee['FullName']}}</td>
        <td>{{employee['GenderName']}}</td>
        <td>{{formatDate(employee['DateOfBirth'])}}</td>
        <td>{{employee['PhoneNumber']}}</td>
        <td>{{employee['Email']}}</td>
        <td>{{employee['PositionName']}}</td>
        <td>{{employee['DepartmentName']}}</td>
        <td>{{formatSalary(employee['Salary'])}}</td>
        <td>{{employee['WorkStatus']}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

import CurrencyFormatter from "@/utils/CurrencyFormatter";
import DateFormatter from "@/utils/DateFormatter";

export default {
  name: 'MisaTable',
  data() {
    return {
      showModal: true,
      wantToCreateNewEmployee: false,
      tableData: this.data,
      employeesToDelete: []
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },

  emits: ['row-double-clicked'],

  watch: {
    data: function() {
      this.tableData = this.data;
      this.$forceUpdate();
    }
  },

  methods: {
    //Hàm định dạng mức lương
    //Author: NQMinh(30/07/2021)
    formatSalary(salary) {
      return CurrencyFormatter.format(salary);
    },

    //Hàm định dạng ngày tháng
    //Author: NQMinh(30/07/2021)
    formatDate(date) {
      return DateFormatter.format(date, false);
    },

    //Hàm truyền dữ liệu từ table vào modal
    //Author: NQMinh(30/07/2021)
    bindingDataFromTable(employee) {
      axios.get(`http://cukcuk.manhnv.net/v1/Employees/${employee['EmployeeId']}`).then(res => {
        this.$emit(
            'row-double-clicked',
            this.showModal,
            res.data,
            this.wantToCreateNewEmployee
        );
      }).catch(res => {
        console.log(res);
      })
    },

    //TODO: Hàm phức tạp và khó hiểu
    //Hàm kích hoạt checkbox khi click vào mỗi hàng
    //Author: NQMinh(31/07/2021)
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

    //Kiểm tra các checkbox được kích hoạt chưa để hiện nút xóa
    //Author: NQMinh(31/07/2021)
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