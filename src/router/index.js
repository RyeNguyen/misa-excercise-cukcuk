import Vue from 'vue';
import VueRouter from 'vue-router';
import Employee from '../view/employee/EmployeeList.vue';
import Customer from '../view/customer/CustomerList.vue';

Vue.use(VueRouter);

const routes = [
    // {path: '/', name: 'Home', component: 'Home'},
    {path: '/', name: 'Employee', component: Employee},
    {path: '/customer', name: 'Customer', component: Customer}
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;