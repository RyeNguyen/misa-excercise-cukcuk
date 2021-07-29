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
    <MisaTable :data="employees"></MisaTable>

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <MisaPopupModal
        :modalIsOpened="modalIsOpened"
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
  components: {
    MisaContentFooter,
    MisaContentHeader,
    MisaContentSearchSection,
    MisaPopupModal,
    MisaTable
  },
  created() {
    const vm = this;
    //Gọi API lấy dữ liệu
    axios.get('http://cukcuk.manhnv.net/v1/Employees').then(res => {
      vm.employees = res.data;
    }).catch(res => {
      console.log(res);
    })
  },
  methods: {
    toggleModal(state) {
      this.modalIsOpened = state;
    }
  },
  data() {
    return {
      employees: [],
      modalIsOpened: false
    }
  }
}
</script>

<style>
@import url('../../css/layout/Content.css');
</style>