<template>
  <div
      class="dropdown__content"
      :class="{'dropdown__content--hidden': contentHidden}"
  >
    <a
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === -1}"
        @click="resetCombobox"
    ><i class="fas fa-check"></i>
      {{ comboboxDefaultOption }}
    </a>
    <a
        v-for="(option, index) in comboboxOptions"
        :key="option[`${comboboxType}Id`]"
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === index}"
        :value="option[`${comboboxType}Id`]"
        @click="optionActive(index)"
    ><i class="fas fa-check"></i>
      {{ option[`${comboboxType}Name`] }}
    </a>
  </div>
</template>

<script>
export default {
  name: "MisaComboboxOptions",

  created() {
    switch (this.comboboxType) {
      case 'Department':
        setTimeout(() => {
          this.comboboxOptions = this.$departmentData;
        }, 1000)
        break;
      case 'Position':
        setTimeout(() => {
          this.comboboxOptions = this.$positionData;
        }, 1000)
        break;
    }
  },

  data() {
    return {
      currentIndex: -1,
      comboboxOptions: [],
      isActive: false
    }
  },

  //#region props
  props: {
    contentHidden: {
      type: Boolean
    },

    comboboxDefaultOption: {
      type: String,
      required: true
    },

    comboboxType: {
      type: String,
      required: true
    }
  },
  //#endregion

  emits: ['combobox-item-active'],

  methods: {
    optionActive(index) {
      this.currentIndex = index;
      this.$emit('combobox-item-active', this.comboboxOptions[this.currentIndex]);
    },

    resetCombobox() {
      this.currentIndex = -1;
      this.$emit('combobox-item-active');
    }
  }
}
</script>

<style lang="scss">

</style>