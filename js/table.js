const employeesTable = document.querySelector('.misa-content__table');
let employeesArray = [];

//Call API lấy dữ liệu nhân viên
getEmployees = async () => {
    try {
        const response = await fetch('http://cukcuk.manhnv.net/v1/Employees');
        employeesArray = await response.json();
        console.log(employeesArray)

        let employees = `<tr class="table__header">
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
                    </tr><tbody>`;

        employeesArray.map(individual => {
            employees += `<tr>`;
            employees += `<td>${examineData(individual.EmployeeCode)}</td>`;
            employees += `<td>${examineData(individual.FullName)}</td>`;
            employees += `<td>${examineData(individual.GenderName)}</td>`;
            employees += `<td>${dateFormatter(examineData(individual.DateOfBirth))}</td>`;
            employees += `<td>${examineData(individual.PhoneNumber)}</td>`;
            employees += `<td>${examineData(individual.Email)}</td>`;
            employees += `<td>${examineData(individual.PositionName)}</td>`;
            employees += `<td>${examineData(individual.DepartmentName)}</td>`;
            employees += `<td>${currencyFormatter(examineData(individual.Salary))}</td>`;
            employees += `<td>${examineData(individual.WorkStatus)}</td>`;
            employees += `</tr>`;
        })
        employees += `</tbody>`

        employeesTable.innerHTML = employees;
    } catch (err) {
        console.error(err);
    }
}

getEmployees().then(r => console.log(r));

const examineData = data => {
    return data ? data : '';
}