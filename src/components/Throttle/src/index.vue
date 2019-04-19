<!-- throttle高阶组件 -->
<template lang="html">
  <div class="">
    <slot>

    </slot>
  </div>
</template>

<script>
import { throttleFn } from '@/common/js/optimize.js'

export default {
  name: 'throttle',
  abstract: true,
  data: () => ({
    // events: '',
    // eventsKeys: null,
    // originMap: null,
    // throttleMap: null
  }),
  props: {
    delay: {
      type: Number,
      default: 0
    },
    events: {
      type: String,
      default: ''
    }
  },
  created() {
    this.eventsKeys = this.events.split(',')
    this.originMap = {}
    this.throttleMap = {}
  },
  render(h) {
    const vNode = this.$slots.default[0]
    console.log(vNode);
    this.eventsKeys.forEach((item, key) => {
      const target = vNode.data.on[key]
      if(target === this.originMap[key] && this.throttleMap[key]) {
        vNode.data.on[key] = this.throttleMap[key]
      }else if(target){
        this.originMap[key] = target
        this.throttleMap[key] = throttleFn(target, this.delay, vNode)
        vNode.data.on[key] = this.throttleMap[key]
      }
    })
    return vNode
  }
}
</script>

<style lang="less">

</style>
