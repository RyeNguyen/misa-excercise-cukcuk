<template>
  <div id="app">
    <Header></Header>
    <Menu></Menu>
    <Content></Content>
  </div>
</template>

<script>
import Header from "./components/layout/TheHeader";
import Menu from "./components/layout/TheMenu";
import Content from "./components/layout/TheContent";

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Content
  }
}
</script>

<style>
@import url('css/Main.css');
</style>
