<template>
  <div class="misa-button--primary misa-button__icon" :id="id">
    <div class="button__icon"></div>
    <div class="button__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'MisaButton',
  props: {
    id: String,
    text: String
  }
}
</script>

<style>
@import url('../../../css/base/Button.css');
</style>