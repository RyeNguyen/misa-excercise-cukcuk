import Vue from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios';
import VueAxios from "vue-axios";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';

import GenderModel from "@/models/GenderModel";
import WorkStatusModel from "@/models/WorkStatusModel";
import PagingModel from "@/models/PagingModel";

import MisaDropdown from "@/components/base/dropdown/MisaDropdown";
import MisaPopupMessage from "@/components/base/popup/MisaPopupMessage";
import MisaButton from "@/components/base/MisaButton";
import MisaCombobox from "@/components/base/combobox/MisaCombobox";
import MisaTable from "@/components/base/MisaTable";
import DepartmentAPI from "@/api/components/DepartmentAPI";
import PositionAPI from "@/api/components/PositionAPI";

Vue.component('MisaDropdown', MisaDropdown);
Vue.component('MisaPopupMessage', MisaPopupMessage);
Vue.component('MisaButton', MisaButton);
Vue.component('MisaCombobox', MisaCombobox);
Vue.component('MisaTable', MisaTable);

DepartmentAPI.getAll().then(res => {
    Vue.prototype.$departmentData = res.data;
}).catch(error => {
    console.log(error);
})

PositionAPI.getAll().then(res => {
    Vue.prototype.$positionData = res.data;
}).catch(error => {
    console.log(error);
})

Vue.prototype.$genderData = GenderModel.initData();

Vue.prototype.$workStatusData = WorkStatusModel.initData();

Vue.prototype.$pagingData = PagingModel.initData();

Vue.prototype.$api = axios;

Vue.use(VueAxios, axios);
Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
