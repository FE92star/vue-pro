<template lang="html">
  <div class="collapse_list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  data: () => ({

  }),
  props: {
    accordion: { //是否是手风琴模式
      type: Boolean,
      default: false
    },
    animationName: { //动画模式
      type: String,
      default: 'fade'
    }
  },
  provide() { //向子组件传递信息
    return {
      accordion: this.accordion,
      name: this.animationName
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.collapse_list {
  position: relative;
  width: 100%;
}
</style>
