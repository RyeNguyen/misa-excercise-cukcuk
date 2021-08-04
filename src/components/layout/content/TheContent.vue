<template>
  <EmployeeList :menuToggled="menuToggled"/>
</template>

<script>
import EmployeeList from "@/view/employee/EmployeeList";

export default {
  name: 'TheContent',

  data() {
    return {

    }
  },

  props: {
    menuToggled: {
      type: Boolean
    }
  },

  components: {
    EmployeeList
  }
}
</script>

<style lang="scss">
.misa-content {
  width: calc(100% - 226px);
  height: calc(100% - 49px);
  position: absolute;
  top: 49px;
  left: 226px;
  padding: 16px;
  background-color: var(--color-secondary-hover);
  transition: 0.2s all ease-in-out;

  &--extend {
    width: calc(100% - 64px);
    left: 64px;
  }
}

#search-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 12px;
  left: 16px;
  background-image: url('../../../assets/icon/search.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover
}

.active {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
}

@media screen and (max-width: 1280px) {
  .misa-content__footer .misa__pagination {
    width: 40%;
  }
}
</style>