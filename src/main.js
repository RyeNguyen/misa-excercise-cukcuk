import Vue from 'vue'
import App from './App.vue'

import axios from 'axios';
import VueAxios from "vue-axios";

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

Vue.prototype.$api = axios;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app')
