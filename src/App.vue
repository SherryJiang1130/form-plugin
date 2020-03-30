<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Wrap />
  </div>
</template>

<script>
import 'iview/dist/styles/iview.css'
import Wrap from './components/Wrap.vue'

export default {
  name: 'App',
  components: {
    Wrap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
