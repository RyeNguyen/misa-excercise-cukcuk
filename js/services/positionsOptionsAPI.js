class PositionsOptionsAPI {
    //Hàm lấy dữ liệu vị trí từ API
    //Author: NQMinh(21/07/2021)
    static getPositionsOptions = () => {
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/v1/Positions',
                method: 'GET',
                async: true
            }).done(res => {
                $('#dropdown__modal-role .dropdown__content').empty();
                res.forEach(position => {
                    const positionName = position['PositionName'];
                    const positionId= position['PositionId'];
                    let positionHTML = `<a value="${positionId}"><i class="fas fa-check"></i>${positionName}</a>`;
                    $('#dropdown__role .dropdown__content').append(positionHTML);
                    $('#dropdown__modal-role .dropdown__content').append(positionHTML);
                    EmployeePage.modalRole = new Dropdown('#dropdown__modal-role');
                    EmployeePage.dropdownRole = new Dropdown('#dropdown__role');
                })
            }).fail(res => {
                switch(res.status) {
                    case 500:
                        alert('Code cùi');
                        break;
                    case 400:
                        alert('Dữ liệu không hợp lệ');
                        break;
                    case 404:
                        alert('Quay đầu là bờ');
                        break;
                }
            })
        } catch(error) {
            console.log(error);
        }
    }
}