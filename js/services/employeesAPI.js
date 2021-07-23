// class EmployeesAPI {
//     static getEmployees = () => {
//         const self = this;
//         Variables.wantToCreateNewEmployee = false;
//         //Hiển thị form chi tiết
//         EmployeePage.openModal();
//         //Lấy id
//         Variables.employeeId = $(self).attr('tr-data');
//         try {
//             $.ajax({
//                 url: `http://cukcuk.manhnv.net/v1/Employees/${Variables.employeeId}`,
//                 method: 'GET',
//             }).done(function (res) {
//                 //binding dữ liệu lên form
//                 EmployeePage.bindingDataFromTable(res);
//             }).fail(function (res) {
//                 switch(res.status) {
//                     case 500:
//                         alert('Code cùi');
//                         break;
//                     case 400:
//                         alert('Dữ liệu không hợp lệ');
//                         break;
//                     case 404:
//                         alert('Quay đầu là bờ');
//                         break;
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }