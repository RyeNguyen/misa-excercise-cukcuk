<template>
  <div class="misa-dropdown" :id="id">
    <button class="dropdown__button" @click="showDropdownOptions">
      <span class="dropdown__title">{{ title }}</span>
      <i class="fas fa-chevron-down"></i>
    </button>
    <div class="dropdown__content dropdown__content--hidden"></div>
  </div>
</template>

<script>


export default {
  name: "MisaDropdown",
  created() {

  },
  data() {
    return {

    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    test() {
      console.log(this.btn, this.id, this.content, this.icon, this.options, this.title)
    },
    showDropdownOptions() {
      // const btn = document.querySelector(`#${this.id} .dropdown__button`);
      const content = document.querySelector(`#${this.id} .dropdown__content`);
      const icon = document.querySelector(`#${this.id} .dropdown__button i`);
      // const options = document.querySelector(`#${this.id} a`);

      icon.classList.toggle('misa-rotate180');
      content.classList.toggle('dropdown__content--showed');
    }
  }
}
</script>