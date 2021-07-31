<template>
  <div class="misa-content__table-container">
    <table class="misa-content__table">
      <thead>
      <tr class="table__header">
        <th></th>
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
          v-for="employee in data"
          :key="employee['EmployeeId']"
          @dblclick="bindingDataFromTable(employee)"
      >
        <td>
          <div class="delete-box">
            <input type="checkbox">
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

    }
  },
  props: ['data'],
  emits: ['row-double-clicked'],
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
        console.table(res.data);
        this.$emit('row-double-clicked', res.data);
      }).catch(res => {
        console.log(res);
      })
    }
  }
}
</script>