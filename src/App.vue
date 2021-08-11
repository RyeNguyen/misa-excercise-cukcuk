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
  </div>
</template>

<script>
import EventIniter from "@/utils/EventDeclarator";

//#region import components
import Header from "./components/layout/TheHeader";
import Menu from "./components/layout/TheMenu";
import Content from "./components/layout/content/TheContent";
//#endregion

export default {
  name: 'App',

  mounted() {
    new EventIniter()
  },

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
