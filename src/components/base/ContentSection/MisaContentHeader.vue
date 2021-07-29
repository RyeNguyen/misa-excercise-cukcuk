<template>
  <div class="misa-content__header">
    <h1 class="misa-content__header header__title">Danh sách nhân viên</h1>
    <div class="button__container">
      <div class="misa-button--primary" id="button__delete-employee">
        <div class="button__text">Xóa nhân viên</div>
      </div>

      <MisaButton id="button__add-employee" text="Thêm nhân viên" @click.native="openModal"></MisaButton>
    </div>
  </div>
</template>

<script>
import MisaButton from "@/components/base/Button/MisaButton";

export default {
  name: "MisaContentHeader",
  data() {
    return {
      modalIsOpened: true
    }
  },
  components: {
    MisaButton
  },
  emits: ['btn-add-clicked'],
  methods: {
    openModal() {
      document.querySelector('.misa-modal-container').style.display = 'flex';
    }
  }
}
</script>