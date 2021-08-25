<template>
  <div
      class="misa-combobox"
      :id="comboboxId"
      :value="value"
      v-click-outside="hideComboboxOptions"
  >
    <input
        ref="comboboxInput"
        type="text"
        :placeholder="comboboxPlaceholder"
        @click="showComboboxOptions"
    />
    <div
        class="misa-button
        misa-button--secondary"
        @click="showComboboxOptions"
    >
      <i
          class="fas fa-chevron-down"
          :class="{'misa-rotate180': iconRotate}"
      ></i>
    </div>
    <MisaComboboxOptions
        :contentHidden="contentHidden"
        :comboboxDefaultOption="comboboxDefaultOption"
        :comboboxType="comboboxType"
        @combobox-item-active="assignCombobox"
    />
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

import MisaComboboxOptions from "@/components/base/combobox/MisaComboboxOptions";

export default {
  name: 'MisaCombobox',

  mounted() {
    this.resetCombobox();
  },

  data() {
    return {
      contentHidden: true,
      comboboxTitle: this.comboboxDefaultOption,
      iconRotate: false,
      value: ''
    }
  },

  //#region props
  props: {
    comboboxId: {
      type: String,
      required: true
    },

    comboboxPlaceholder: {
      type: String,
      required: true
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

  components: {
    MisaComboboxOptions
  },

  directives: {
    ClickOutside
  },

  emits: ['combobox-chosen'],

  methods: {
    /**
     * Hàm hiện các lựa chọn cho combobox
     * Author: NQMinh (10/08/2021)
     */
    showComboboxOptions: function () {
      this.contentHidden = false;
      this.iconRotate = true;
      this.$refs.comboboxInput.focus();
    },

    /**
     * Hàm ẩn các lựa chọn cho combobox
     * Author: NQMinh (10/08/2021)
     */
    hideComboboxOptions: function () {
      this.contentHidden = true;
      this.iconRotate = false;
    },

    /**
     * Hàm đặt lại giá trị mặc định cho combobox
     * Author: NQMinh (10/08/2021)
     */
    resetCombobox: function() {
      this.$refs.comboboxInput.value = this.comboboxTitle;
    },

    /**
     * Hàm chọn giá trị cho combobox
     * @param item
     * Author: NQMinh (10/08/2021)
     */
    assignCombobox: function (item) {
      if (item) {
        this.$refs.comboboxInput.value = item[`${this.comboboxType}Name`];
        this.value = item[`${this.comboboxType}Id`];
      } else {
        this.$refs.comboboxInput.value = this.comboboxTitle;
        this.value = '';
      }
      this.$emit('combobox-chosen', this.value, this.comboboxType);
      this.hideComboboxOptions();
    }
  }
}
</script>

<style lang="scss" scoped>
.misa-combobox {
  width: 200px;
  position: relative;

  & input {
    padding: 0 54px 0 16px;

    &:focus ~ .misa-button {
      background-color: var(--color-secondary-hover);
      border-left: 1px solid var(--color-secondary-hover);
    }
  }

  & .misa-button--secondary {
    position: absolute;
    top: 0.7px;
    right: 1px;
    width: 38px;
    height: 38px;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid var(--color-hightlight);

    & i {
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>