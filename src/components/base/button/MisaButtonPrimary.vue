<template>
  <div class="misa-button" :id="id">
    <img :src="require(`@/assets/icon/${img}`)" alt="button-icon" class="misa-button__icon">
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
    }
  }
}
</script>

<style scoped>
.misa-button {
  color: var(--color-white);
  background-color: var(--color-primary);
}

.misa-button:hover {
  background-color: var(--color-primary-hover);
}

.misa-button:active {
  background-color: var(--color-primary-active);
}
</style>