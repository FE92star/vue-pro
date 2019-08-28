<template lang="html">
  <div class="">
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import clockCanvas from '@/common/js/clock.js'

export default {
  name: 'canvas-learn',
  methods: {
    initCanvas() {
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      console.log(context.canvas.width);
      context.font = '38pt Arial'
      context.fillStyle = 'cornflowerblue'
      context.strokeStyle = 'blue'
      context.fillText('Hello Canvas', canvas.width/2-150, canvas.height/2+15)
      context.strokeText('Hello Canvas', canvas.width/2-150, canvas.height/2+15)
    }
  },
  mounted() {
    // this.initCanvas()
    setInterval(() => {
      clockCanvas('canvas').drawClock()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
#canvas {
  width: 350px;
  height: 350px;
}
</style>
