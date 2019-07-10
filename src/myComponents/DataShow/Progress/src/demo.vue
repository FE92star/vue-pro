<template lang="html">
  <div class="">
    <!-- 圆形 -->
    <div class="progress">
      <bao-progress :percentage='50' type="circle" background='#4679E7' textColor='#4678e7' circleText='立即投资' strokeWidth="80" strokeHeight="80" circleWidth="35"></bao-progress>
    </div>
    <!-- 线性 -->
    <div class="line">
      <bao-progress :percentage="100" :animationState="true" background='#4679E7'></bao-progress>
    </div>
  </div>
</template>

<script>
import BaoProgress from '../index.js'

export default {
  components: {
    BaoProgress
  }
}
</script>

<style lang="less">
.progress {
  width: 80px;
}
.line {
  width: 100%;
  height: 12px;
}
</style>
