<template>
  <div class="misa-content">
    <!-- header của content ở đây, bao gồm title và nút thêm nhân viên -->
    <MisaContentHeader></MisaContentHeader>

    <!-- mục tìm kiếm của content ở đây -->
    <MisaContentSearchSection></MisaContentSearchSection>

    <!-- bảng chính của content ở đây -->
    <MisaTable :data="employees"></MisaTable>

    <!-- footer của content ở đây -->
    <MisaContentFooter></MisaContentFooter>

    <MisaPopupModal></MisaPopupModal>
  </div>
</template>

<script>
import axios from "axios";

import MisaContentFooter from "@/components/base/ContentSection/MisaContentFooter";
import MisaContentHeader from "@/components/base/ContentSection/MisaContentHeader";
import MisaContentSearchSection from "@/components/base/ContentSection/MisaContentSearchSection";
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
    //Hàm kích hoạt checkbox của từng hàng
    //Author: NQMinh(22/07/2021)
    rowActive(row) {
      //chọn một lượt tất cả check box để duyệt mảng
      // const deleteBoxes = document.querySelectorAll('.delete-box input');
      // //chọn một hàng cụ thể
      // const row = $(self).children()[0];
      // //chọn checkbox từ hàng đó
      // const checkbox = $(row).children().children()[0];
      // $(checkbox).attr('checked', !$(checkbox).attr('checked'));
      //
      // let allUnchecked = true;
      // deleteBoxes.forEach(box => {
      //   if (box.getAttribute('checked') === 'checked') {
      //     allUnchecked =  false;
      //     Variables.buttonDelete.css('display', 'flex');
      //   }
      //   if (allUnchecked) {
      //     Variables.buttonDelete.css('display', 'none');
      //   }
      // })
      console.table(row.EmployeeId);
    },
  },
  data() {
    return {
      employees: [],
    }
  }
}
</script>

<style>
@import url('../../css/layout/Content.css');
</style>