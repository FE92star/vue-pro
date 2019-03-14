<template>
  <div id="app">
    <img alt="Vue logo" src="//r.51gjj.com/image/static/icon-licai-page-kongsjsb.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue';;

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    getB() {
      console.log(window.location.origin);;
    }
  },
  created() {
    this.getB()
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
}
</style>
