import Vue from 'vue'
import App from './App.vue'

import axios from 'axios';
import VueAxios from "vue-axios";

import MisaDropdown from "@/components/base/dropdown/MisaDropdown";
import MisaPopupMessage from "@/components/base/popup/MisaPopupMessage";
import MisaButton from "@/components/base/MisaButton";
import MisaCombobox from "@/components/base/MisaCombobox";
import MisaTable from "@/components/base/MisaTable";

Vue.component('MisaDropdown', MisaDropdown);
Vue.component('MisaPopupMessage', MisaPopupMessage);
Vue.component('MisaButton', MisaButton);
Vue.component('MisaCombobox', MisaCombobox);
Vue.component('MisaTable', MisaTable);

Vue.prototype.$api = axios;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
