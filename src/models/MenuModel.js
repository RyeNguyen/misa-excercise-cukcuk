export default class MenuModel {
    static initData() {
        return [
            {
                menuItemId: 1,
                menuItemIcon: 'dashboard.png',
                menuItemText: 'Báo cáo',
                menuItemPath: '/dashboard'
            },
            {
                menuItemId: 2,
                menuItemIcon: 'report.png',
                menuItemText: 'Báo cáo',
                menuItemPath: '/report'
            },
            {
                menuItemId: 3,
                menuItemIcon: 'dashboard.png',
                menuItemText: 'Mua hàng',
                menuItemPath: '/dashboard'
            },
            {
                menuItemId: 4,
                menuItemIcon: 'dic-employee.png',
                menuItemText: 'Danh mục nhân viên',
                menuItemPath: '/'
            },
            {
                menuItemId: 5,
                menuItemIcon: 'dic-employee.png',
                menuItemText: 'Danh mục khách hàng',
                menuItemPath: '/customer'
            },
            {
                menuItemId: 6,
                menuItemIcon: 'setting.png',
                menuItemText: 'Thiết lập hệ thống',
                menuItemPath: '/options'
            },
        ]
    }
}