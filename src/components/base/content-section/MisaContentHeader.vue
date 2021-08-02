<template>
  <div class="misa-content__header">
    <h1 class="misa-content__header header__title">Danh sách nhân viên</h1>
    <div class="button__container">
      <MisaButton
          id="button__delete-employee"
          text="Xóa nhân viên"
          :buttonDeleteShown="buttonDeleteShown"
          @click.native="deleteEmployee"
      />

      <MisaButton
          id="button__add-employee"
          text="Thêm nhân viên"
          img="add.png"
          @click.native="openModal"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import MisaButton from "@/components/base/button/MisaButtonPrimary";

export default {
  name: "MisaContentHeader",
  mounted() {
    axios.get(`http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode`).then(res => {
      this.newEmployeeCode = res.data;
    }).catch(res => {
      console.log(res);
    })
  },

  data() {
    return {
      hideModal: !this.modalIsOpened,
      newEmployeeCode: '',
      wantToCreateNewEmployee: true
    }
  },

  props: {
    buttonDeleteShown: {
      type: Boolean,
      required: true
    },

    modalIsOpened: Boolean,

    employeesToDelete: Array
  },

  components: {
    MisaButton
  },

  emits: ['btn-add-clicked', 'delete-success'],

  methods: {
    /**
     * Hàm mở modal khi click thêm nhân viên
     Author: NQMinh(30/07/2021)
     */
    openModal() {
      this.$emit(
          'btn-add-clicked',
          this.hideModal,
          this.newEmployeeCode,
          this.wantToCreateNewEmployee
      );
    },

    /**
     * Hàm xóa nhân viên
     Author: NQMinh(31/07/2021)
     */
    deleteEmployee() {
      const vm = this;
      vm.employeesToDelete.forEach(employeeId => {
        axios.delete(`http://cukcuk.manhnv.net/v1/Employees/${employeeId}`).then(res => {
          console.log(res);
          vm.$emit('delete-success');
        }).catch(res => {
          console.log(res);
        })
      })
    }
  }
}
</script>

<style lang="scss">
.misa-content__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .header__title {
    font-weight: bold;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }

  & .button__container {
    display: flex;
    gap: 16px;
  }
}
</style>