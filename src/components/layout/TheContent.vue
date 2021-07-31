<template>
  <div class="misa-content">
    <!-- header của content ở đây, bao gồm title và nút thêm nhân viên -->
    <MisaContentHeader
        :modalIsOpened="modalIsOpened"
        @btn-add-clicked="toggleModal"
    />

    <!-- mục tìm kiếm của content ở đây -->
    <MisaContentSearchSection></MisaContentSearchSection>

    <!-- bảng chính của content ở đây -->
    <MisaTable
        :data="employees"
        @row-double-clicked="bindingDataFromTable"
    />

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <MisaPopupModal
        :employeeData="individualData"
        :modalIsOpened="modalIsOpened"
        :newEmployeeCode="employeeCode"
        @btn-close-clicked="toggleModal"
    />
  </div>
</template>

<script>
import axios from "axios";

import MisaContentFooter from "@/components/base/content-section/MisaContentFooter";
import MisaContentHeader from "@/components/base/content-section/MisaContentHeader";
import MisaContentSearchSection from "@/components/base/content-section/MisaContentSearchSection";
import MisaPopupModal from "@/components/base/MisaPopupModal";
import MisaTable from "@/components/base/MisaTable";

export default {
  name: 'TheContent',
  mounted() {
    const vm = this;
    //Gọi API lấy dữ liệu
    axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
      vm.employees = res.data;
    }).catch(res => {
      console.log(res);
    })
  },

  data() {
    return {
      employees: [],
      employeeCode: '',
      individualData: null,
      modalIsOpened: false,
    }
  },

  components: {
    MisaContentFooter,
    MisaContentHeader,
    MisaContentSearchSection,
    MisaPopupModal,
    MisaTable
  },

  methods: {
    bindingDataFromTable(employee) {
      this.individualData = employee;
    },

    toggleModal(state, newEmployeeCode) {
      this.employeeCode = newEmployeeCode;
      this.modalIsOpened = state;
    }
  }
}
</script>

<style>
@import url('../../css/layout/Content.css');
</style>