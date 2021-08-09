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
import Toast from "@/utils/ToastsCreator";

export default {
  name: "MisaComboboxOptions",

  created() {
    let apiUrl = '';

    //TODO: Hiện tại đang fix cứng call API của phòng ban và vị trí ở đây
    switch (this.comboboxType) {
      case 'Department':
        apiUrl = 'http://cukcuk.manhnv.net/api/Department';
        break;
      case 'Position':
        apiUrl = 'http://cukcuk.manhnv.net/v1/Positions';
        break;
    }

    this.$api.get(apiUrl).then(res => {
      this.comboboxOptions = res.data;
    }).catch(error => {
      console.log(error);
      new Toast(error.response.status);
    })
  },

  data() {
    return {
      currentIndex: -1,
      comboboxOptions: [],
      isActive: false
    }
  },

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