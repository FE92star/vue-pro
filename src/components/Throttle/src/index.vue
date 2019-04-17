<!-- throttle高阶组件 -->
<template lang="html">

</template>

<script>
import { throttleFn } from '@/common/js/optimize.js'

export default {
  name: 'throttle',
  data: () => ({
    
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

}
</script>

<style lang="less">

</style>
