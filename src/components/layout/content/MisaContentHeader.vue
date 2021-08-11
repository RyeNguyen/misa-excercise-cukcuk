<template>
  <div class="misa-content__header">
    <h1 class="misa-content__header header__title">Danh sách nhân viên</h1>
    <div class="button__container">
      <MisaButton
          buttonId="button__delete-employee"
          buttonIconFontAwesome="far fa-trash-alt"
          buttonText="Xóa nhân viên"
          buttonType="alert"
          :buttonDeleteShown="buttonDeleteShown"
          @click.native="openAlertMessage"
      />

      <MisaButton
          buttonId="button__add-employee"
          buttonText="Thêm nhân viên"
          buttonType="primary"
          buttonIcon="add.png"
          @click.native="openModal"
      />
    </div>
  </div>
</template>

<script>
import Toast from "@/utils/ToastsCreator";

import MisaButton from "@/components/base/MisaButton";

export default {
  name: "MisaContentHeader",

  mounted() {
    this.$api.get(`http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode`).then(res => {
      this.newEmployeeCode = res.data;
    }).catch(error => {
      new Toast(error.response.status);
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

    modalIsOpened: Boolean
  },

  components: {
    MisaButton
  },

  emits: [
    'btn-add-clicked',
    'delete-success',
    'open-popup'
  ],

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

    openAlertMessage() {
      this.$emit('open-popup', true);
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
    color: var(--color-black);
    margin: 0;
    padding: 0;
  }

  & .button__container {
    display: flex;
    gap: 16px;
  }
}
</style>