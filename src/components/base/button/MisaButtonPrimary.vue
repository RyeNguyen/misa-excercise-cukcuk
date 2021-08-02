<template>
  <div class="misa-button" :id="id" :class="{'btn-show': buttonDeleteShown}">
    <img v-if="img" :src="require(`@/assets/icon/${img}`)" alt="button-icon" class="misa-button__icon">
    <div class="button__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'MisaButton',
  props: {
    id: {
      type: String,
      required: true,
    },
    img: {
      type: String
    },
    text: {
      type: String
    },
    buttonDeleteShown: Boolean
  }
}
</script>

<style lang="scss" scoped>
.misa-button {
  color: var(--color-white);
  background-color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary-active);
  }
}

#button__delete-employee {
  background-color: var(--color-alert);
  display: none;
}

#button__delete-employee:hover {
  background-color: var(--color-alert-hover);
}

.btn-show {
  display: flex !important;
}
</style>