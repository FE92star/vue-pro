<template lang="html">
  <div class="">
    <div class="progress">
      <progressBar :percentage='50' type="circle" background='#4679E7' textColor='#4678e7' circleText='立即投资' strokeWidth="80" strokeHeight="80" circleWidth="35"></progressBar>
    </div>
    <div class="line">
      <progress-bar :percentage="100" :animationState="true" background='#4679E7'></progress-bar>
    </div>
  </div>
</template>

<script>
import progressBar from '../index.js'

export default {
  components: {
    progressBar
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
