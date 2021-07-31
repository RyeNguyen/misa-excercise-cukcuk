<template>
  <div class="misa-content">
    <!-- header của content ở đây, bao gồm title và nút thêm nhân viên -->
    <MisaContentHeader
        :modalIsOpened="modalIsOpened"
        :buttonDeleteShown="buttonDeleteShown"
        :employeesToDelete="employeesToDelete"
        @btn-add-clicked="toggleModal"
    />

    <!-- mục tìm kiếm của content ở đây -->
    <MisaContentSearchSection
        @reload="loadData"
    />

    <!-- bảng chính của content ở đây -->
    <MisaTable
        :data="employees"
        @row-double-clicked="bindingDataFromTable"
        @show-btn-delete="showButtonDelete"
        @hide-btn-delete="hideButtonDelete"
    />

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <MisaPopupModal
        :employeeData="individualData"
        :modalIsOpened="modalIsOpened"
        :newEmployeeCode="employeeCode"
        :wantToCreateNewEmployee="wantToCreateNewEmployee"
        @btn-close-clicked="toggleModal"
        @modal-submitted="loadData"
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
    this.loadData();
  },

  data() {
    return {
      buttonDeleteShown: false,
      employees: [],
      employeeCode: '',
      employeesToDelete: [],
      individualData: null,
      modalIsOpened: false,
      wantToCreateNewEmployee: true
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
    loadData() {
      console.log('Load data nè :>')
      //Gọi API lấy dữ liệu
      axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
        this.employees = res.data;
      }).catch(res => {
        console.log(res);
      })
    },

    //Hàm binding dữ liệu từ bảng vào modal
    //Author: NQMinh(31/07/2021)
    bindingDataFromTable(state, employee, createNew) {
      this.modalIsOpened = state;
      this.individualData = employee;
      this.wantToCreateNewEmployee = createNew;
    },

    //Hàm ẩn hiện và truyền mã nv mới vào modal
    //Author: NQMinh(29/07/2021)
    toggleModal(state, newEmployeeCode, createNew) {
      this.employeeCode = newEmployeeCode;
      this.modalIsOpened = state;
      this.wantToCreateNewEmployee = createNew;
    },

    showButtonDelete(employeesToDelete) {
      this.buttonDeleteShown = true;
      this.employeesToDelete = employeesToDelete;
    },

    hideButtonDelete() {
      this.buttonDeleteShown = false;
    }
  }
}
</script>

<style>
@import url('../../css/layout/Content.css');
</style>