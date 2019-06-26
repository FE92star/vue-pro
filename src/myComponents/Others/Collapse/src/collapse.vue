<template lang="html">
  <div class="collapse_wrap" @click="showPiano">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'bao-collapse',
  props: {
    accordion: { // 是否为手风琴模式
      type: Boolean,
      default: false
    },
    animateName: {
      type: String,
      default: 'fade'
    }
  },
  provide() { // 向子组件传递信息
    return {
      accordion: this.accordion,
      name: this.animateName
    }
  },
  methods: {
    showPiano(e) {
      let target = e.target || e.srcElement
      let name = target.getAttribute('topName')
      console.log(name);
    }
  }
}
</script>

<style lang="less" scoped>
.collapse_wrap {
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>
