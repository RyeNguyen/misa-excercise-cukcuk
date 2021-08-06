<template>
  <div class="misa-modal__field">
    <label :for="fieldId" class="misa-label-text">
      {{ fieldLabel }}
      <span v-if="isRequired">
        (<span class="misa-asterisk">*</span>)
      </span>
    </label>
    <slot name="misa-text-box"/>
  </div>
</template>


<script>
export default {
  name: "MisaPopupModalField",

  props: {
    fieldLabel: {
      type: String,
      required: true
    },

    isRequired: {
      type: Boolean
    },

    fieldId: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.misa-modal {
  &__fields {
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__field {
    width: 49%;
    margin-bottom: 16px;
    position: relative;

    & .misa-label-text {
      display: block;
      margin-bottom: 4px;
    }

    & input,
    & .misa-dropdown {
      width: 100%;
    }
  }
}

.misa-asterisk {
  color: var(--color-alert);
}
</style>