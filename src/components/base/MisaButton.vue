<template>
  <div
      :class=
      "[
          'misa-button',
          'misa-button--' + buttonType,
          buttonClass
      ]"
      :id="buttonId"
  >
    <img
        v-if="buttonIcon"
        :src="require(`@/assets/icon/${buttonIcon}`)"
        alt="button-icon"
        class="misa-button__icon"
    >
    <i
      v-if="buttonIconFontAwesome"
      :class="buttonIconFontAwesome"
    ></i>
    <div class="button__text">{{ buttonText }}</div>
  </div>
</template>

<script>
export default {
  name: 'MisaButton',

  props: {
    buttonId: {
      type: String,
    },

    buttonIcon: {
      type: String
    },

    buttonIconFontAwesome: {
      type: String
    },

    buttonText: {
      type: String
    },

    buttonType: {
      type: String,
      default: 'primary'
    },

    buttonDeleteShown: Boolean
  },

  computed: {
    buttonClass: function() {
      return {
        'btn-show': this.buttonDeleteShown,
      }
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.misa-button {
  &--primary {
    color: var(--color-white);
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary-hover);
    }

    &:active {
      background-color: var(--color-primary-active);
    }
  }

  &--secondary {
    color: var(--color-black);
    background-color: var(--color-secondary);
    gap: 0;
    border: 1px solid var(--color-hightlight);

    &:hover {
      background-color: var(--color-secondary-hover);
    }

    &:active {
      color: var(--color-white);
      background-color: var(--color-primary);
    }
  }

  &--alert {
    color: var(--color-white);
    background-color: var(--color-alert);

    &:hover {
      background-color: var(--color-alert-hover);
    }
  }
}

#button__delete-employee {
  display: none;
}

.btn-show {
  display: flex !important;
}
</style>