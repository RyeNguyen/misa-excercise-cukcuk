<template>
  <div id="app">
    <Header
        @toggle-menu="menuToggled = !menuToggled"
    />
    <Menu
        :menuToggled="menuToggled"
    />
    <Content
        :menuToggled="menuToggled"
    />
<!--    <router-view/>-->
  </div>
</template>

<script>
//#region import components
import Header from "./components/layout/TheHeader";
import Menu from "./components/layout/TheMenu";
import Content from "./components/layout/content/TheContent";
//#endregion

export default {
  name: 'App',

  data() {
    return {
      menuToggled: false
    }
  },

  components: {
    Header,
    Menu,
    Content
  }
}
</script>

<style lang="scss">
@import './assets/css/Fonts.css';
@import './assets/css/Variables.css';
@import './assets/css/Main';
</style>
