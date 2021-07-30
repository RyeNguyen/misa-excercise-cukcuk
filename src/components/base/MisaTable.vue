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
      <tr v-for="employee in data" :key="employee.EmployeeId">
        <td>
          <div class="delete-box">
            <input type="checkbox">
            <span class="misa-checkmark"></span>
          </div>
        </td>
        <td>{{employee['EmployeeCode']}}</td>
        <td>{{employee['FullName']}}</td>
        <td>{{employee['GenderName']}}</td>
        <td>{{employee['DateOfBirth']}}</td>
        <td>{{employee['PhoneNumber']}}</td>
        <td>{{employee['Email']}}</td>
        <td>{{employee['PositionName']}}</td>
        <td>{{employee['DepartmentName']}}</td>
        <td>{{employee['Salary']}}</td>
        <td>{{employee['WorkStatus']}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>