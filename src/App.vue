<template>
  <div id="app">
    <Header></Header>
    <Menu></Menu>
    <Content></Content>
  </div>
</template>

<script>
import EventIniter from "@/utils/EventDeclarator";
import Header from "./components/layout/TheHeader";
import Menu from "./components/layout/TheMenu";
import Content from "./components/layout/TheContent";

export default {
  name: 'App',

  mounted() {
    new EventIniter()
  },

  components: {
    Header,
    Menu,
    Content
  }
}
</script>

<style lang="scss">
@import './css/Fonts.css';
@import 'css/layout/Variables.css';
@import './css/Main';
</style>
