<template>
  <div id='page' v-show='get_page'>
    <transition :name='"page-"+action'>
      <component :is="get_page"></component>
    </transition>
  </div>
</template>

<script>
import {getUrlData} from '../index'

export default {
  name: 'nav-router',
  data: ()=> ({
    get_page: '',
    action: 'forword',
  }),
  mounted() {
    let p = getUrlData()
    if(p.page) {
      this.action = 'fade'
      this.get_page = p.page
    }
  }
}
</script>

<style lang="less">
#page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &>div {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
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
.page-forward-enter-active, .page-backward-enter-active, 
.page-forward-leave-active, .page-backward-leave-active
{
  .transition(transform 0.4s);
  position: absolute;
}
.page-forward-enter, .page-backward-leave-active
{
  .transform(translate(100%));
}
.page-forward-enter,.page-backward-leave-active,
.page-forward-enter-to,.page-backward-leave-to{
  z-index: 5 !important;
}
.page-fade-enter-active {
  transition: all .3s linear;
}
.page-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.page-fade-enter, .page-fade-leave-to {
  opacity: 0;
}
</style>

