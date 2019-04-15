<template>
  <div id="app">
    <transition :name='"page-"+get_router'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'get_router'
    ])
  },
  methods: {
    backFn() {
      if(Bridge) {
        const self = this
        Bridge.onBack(function() {
          let isBack = true
          let h = window.sessionStorage.getItem('HISTORY')
          if(h) {
            const arr = JSON.parse(h)
            if(arr.length && arr.length>0) {
              isBack = true
            }else {
              isBack = false
            }
          }else {
            isBack = false
          }
          self.$router.back()
          return isBack
				});
      }
    }
  },
  created() {

  },
  mounted() {
    setTimeout(()=> {
      this.backFn()
    }, 100)
    setTimeout(()=> {
      let t = window.location.href.replace(/.*h5\/demo/g, '')
      window.sessionStorage.setItem('HISTORY_INIT', t)
    }, 500)
  },
  watch: {
    '$route'(to, from) {
      if(window.directionPage=='backward') {
        if(this.$route.meta.onload) {
          this.$route.meta.onload()
        }
      }
      if(this.$route.meta.change) {
        this.$route.meta.change()
      }
      document.title = this.$route.meta.title
      Bridge.setTitle(to.meta.title)
      if(Bridge) {
        const self = this
        Bridge.onBack(()=> {
          let isBack = true
          let h = window.sessionStorage.getItem('HISTORY')
          if(h) {
            const arr = JSON.parse(h)
            if(arr.length && arr.length>0) {
              isBack = true
            }else {
              isBack = false
            }
          }else {
            isBack = false
          }
          // this.$router.back()
          this.$router.goBack(-1)
          return isBack
				});
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-scrolling-touch: touch;
}
.pre(@style,@value){
    -webkit-@{style}: @value;
    -ms-@{style}: @value;
            @{style}: @value;
}
.animation(@value){
    .pre(animation,@value);
}
.transition(@arg){
    .pre(transition,@arg);
}
.transform(@arg){
    .pre(transform,@arg);
}
.page-forward-enter-active,
.page-backward-enter-active,
.page-forward-leave-active,
.page-backward-leave-active
{
  .transition(transform 0.4s);
  position: absolute;
}
.page-forward-enter,
.page-backward-leave-active
{
  .transform(translate(100%));
}
.page-forward-enter,.page-backward-leave-active,.page-forward-enter-to,.page-backward-leave-to{
  z-index: 99 !important;
}
</style>
