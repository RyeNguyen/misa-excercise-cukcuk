<template>
  <div
      class="misa-combobox"
      :id="comboboxId"
      :value="value"
      @click="showComboboxOptions"
  >
    <input
        ref="comboboxInput"
        type="text"
        :placeholder="comboboxPlaceholder"
        @focusout="hideComboboxOptions"
    />
    <div class="misa-button misa-button--secondary">
      <i
          class="fas fa-chevron-down"
          :class="{'misa-rotate180': iconRotate}"
      ></i>
    </div>
    <MisaComboboxOptions
        :contentHidden="contentHidden"
        :comboboxDefaultOption="comboboxDefaultOption"
        :comboboxType="comboboxType"
    />
  </div>
</template>

<script>
import MisaComboboxOptions from "@/components/base/combobox/MisaComboboxOptions";

export default {
  name: 'MisaCombobox',

  mounted() {
    this.resetCombobox();
  },

  data() {
    return {
      contentHidden: true,
      iconRotate: false,
      value: ''
    }
  },

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

  components: {
    MisaComboboxOptions
  },

  methods: {
    showComboboxOptions: function () {
      this.contentHidden = false;
      this.iconRotate = true;
      this.$refs.comboboxInput.focus();
    },

    hideComboboxOptions: function() {
      this.contentHidden = true;
      this.iconRotate = false;

      //TODO: Tạm đây đã, sau khi làm optionActive thì bỏ
      this.resetCombobox();
    },

    resetCombobox: function() {
      this.$refs.comboboxInput.value = this.comboboxDefaultOption;
    },
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
    right: 0.1px;
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