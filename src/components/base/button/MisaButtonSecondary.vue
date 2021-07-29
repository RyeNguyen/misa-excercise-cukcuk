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
  color: var(--color-black);
  background-color: transparent;
  border: 1px solid var(--color-hightlight);
  gap: 0;
  padding: 0 16px;
}

.misa-button:hover {
  background-color: var(--color-secondary-hover);
}

.misa-button:active {
  background-color: var(--color-primary-active);
}
</style>