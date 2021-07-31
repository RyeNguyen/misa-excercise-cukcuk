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

  emits: ['btn-add-clicked'],

  methods: {
    openModal() {
      this.$emit(
          'btn-add-clicked',
          this.hideModal,
          this.newEmployeeCode,
          this.wantToCreateNewEmployee
      );
    },

    deleteEmployee() {
      console.log(this.employeesToDelete)
      this.employeesToDelete.forEach(employeeId => {
        axios.delete(`http://cukcuk.manhnv.net/v1/Employees/${employeeId}`).then(res => {
          console.log(res);
        }).catch(res => {
          console.log(res);
        })
      })
    }
  }
}
</script>