<template>
  <div
      class="misa-menu__item"
      :class="[activeClass, {'misa-menu__item--shrink': menuToggled}]"
  >
    <div class="misa-menu__icon"
         :class="{'misa-menu__icon--shrink': menuToggled}"
      :style="{backgroundImage: 'url(' + require(`@/assets/icon/${itemIcon}`) + ')'}"
    />
    <div
        class="misa-menu__item-text"
        :class="{'misa-hidden': menuToggled}"
    >
      {{ itemText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MisaMenuItem",

  props: {
    activeClass: {
      type: Object
    },

    itemIcon: {
      type: String,
      required: true
    },

    itemText: {
      type: String,
      required: true
    },

    menuToggled: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.misa-menu__item {
  height: 44px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &--shrink {
    justify-content: space-evenly;
  }

  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-black);
  }

  &--active {
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  & .misa-menu__icon {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 10px;

    &--shrink {
      margin-right: 0 !important;
    }
  }
}
</style>