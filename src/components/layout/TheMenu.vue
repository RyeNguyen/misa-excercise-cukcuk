<template>
  <div
      class="misa-menu"
      :class="{'misa-menu--shrink': menuToggled}"
  >
    <MenuItem
        v-for="(item, index) in menuItems"
        :key="item['menuItemId']"
        :itemIcon="item['menuItemIcon']"
        :itemText="item['menuItemText']"
        :activeClass="{'misa-menu__item--active': currentIndex === index}"
        :menuToggled="menuToggled"
        @click.native="activeItem(index)"
    />
  </div>
</template>

<script>
import MenuModel from "@/models/MenuModel";

import MenuItem from "@/components/base/MisaMenuItem";

export default {
  name: 'TheMenu',

  mounted() {
    this.menuItems = MenuModel.initData();
    this.currentIndex = 3;
  },

  data() {
    return {
      menuItems: [],
      currentIndex: -1
    }
  },

  props: {
    menuToggled: {
      type: Boolean
    }
  },

  components: {
    MenuItem
  },

  methods: {
    activeItem(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="scss">
.misa-menu {
  width: 226px;
  height: calc(100vh - 49px);
  border-right: 1px solid var(--color-hightlight);
  transition: 0.2s all ease-in-out;

  &--shrink {
    width: 64px;
  }
}
</style>