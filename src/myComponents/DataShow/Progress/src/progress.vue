<!-- 进度条组件 -->
<template lang="html">
  <div class="progress_wrap">
    <!-- 线型进度条 -->
    <div class="progress_line" :style="lineStyle" v-if="type === 'line'">
      <div class="progress" :style="barStyle">
        <div class="progress_text" v-if="textShow" :style="{lineHeight: `${strokeHeight}px`}">{{percentage}}%</div>
      </div>
    </div>
    <!-- 圆形进度条 -->
    <div class="progress_circle" v-else-if="type === 'circle'">
      <svg :viewbox="(`0,0,${strokeWidth},${strokeHeight}`)" :width="strokeWidth" :height="strokeHeight">
        <circle :cx="strokeWidth/2" :cy="strokeWidth/2" :r="circleWidth" :stroke-width="fillWidth" stroke="#D1D3D7" fill="none"></circle> <!-- 默认底色是灰色 -->
        <circle :cx="strokeWidth/2" :cy="strokeWidth/2" :r="circleWidth" :stroke-width="fillWidth" :stroke="background" fill="none" :transform="(`matrix(0,-1,1,0,0,${strokeWidth})`)" :stroke-dasharray="strokeDasharray"></circle>
      </svg>
      <div class="circle_text" v-if="circleText" :style="{color: `${textColor}`}">{{circleText}}</div>
    </div>
  </div>
</template>
<script>
import { requestAnimationFrame, cancelAnimationFrame } from '@/common/js/requestAnimationFrame.js';

export default {
  name: 'bao-progress',
  data: ()=> ({
    percent: 0,
  }),
  props: {
    type: { //进度条类型,line表示线形,circle表示环形
      type: String,
      default: 'line'
    },
    strokeWidth: { //条形进度条的总宽度或者圆形进度条的画布宽度
      type: [Number, String],
      default: 120
    },
    strokeHeight: {//条形进度条的总高度或者圆形进度条的画布高度
      type: [Number, String],
      default: 12
    },
    circleWidth: { //环形进度条的半径
      type: [Number, String],
      default: 27
    },
    fillWidth: { //环形进度条的填充宽度
      type: [Number, String],
      default: 3
    },
    percentage: { //进度条百分比
      type: Number,
      default: 0,
      required: true
    },
    background: { //进度条的背景色
      type: String,
      default: ''
    },
    textShow: { //是否显示进度文案
      type: Boolean,
      default: false
    },
    circleText: { //环形进度条里面的文案
      type: String,
      default: ''
    },
    textColor: { //环形进度条文案的颜色
      type: String,
      default: ''
    },
    animationState: { //是否有进度条动画效果
      type: Boolean,
      default: false
    }
  },
  computed: {
    barStyle() { //条形进度条的样式
      const style = {};
      let radius = '';
      radius = Math.floor(this.strokeHeight / 2 )+ 'px';
      style.width = this.percent + '%';
      style.background = this.background;
      style.borderRadius = radius;
      return style;
    },
    lineStyle() { //条形进度条外围的样式
      const style = {};
      let radius = '';
      radius = Math.floor(this.strokeHeight / 2 )+ 'px';
      // style.width = typeof(this.strokeWidth) == 'number' ? this.strokeWidth + 'px' : this.strokeWidth;
      style.marginLeft = typeof(this.strokeWidth) == 'string' ? (100-parseFloat(this.strokeWidth)) + '%': 0;
      // style.height = this.strokeHeight + 'px';
      style.borderRadius = radius;
      return style;
    },
    strokeDasharray() { //用于计算环形进度条的百分比
      const percent = this.percentage / 100;
      const permiter = Math.PI * 2 * this.circleWidth;
      let strokeStyle = '';
      strokeStyle = permiter * percent + ' ' + permiter * (1 - percent);
      return strokeStyle;
    }
  },
  methods: {
    translateFn() {
      let timer = null;
      this.percent += 1;
      if(this.percent < this.percentage) { //利用requestAnimationFrame取代定时器优化动画
        timer = requestAnimationFrame(this.translateFn);
      }else {
        cancelAnimationFrame(timer)
      }
    }
  },
  mounted() { //进度条定时动画
    if(this.animationState) {
      this.percent = this.percentage - parseInt(this.percentage);
      requestAnimationFrame(this.translateFn);
    }else {
      this.percent = this.percentage;
    }
  }
}
</script>
<style lang="less" scoped>
  .progress_wrap { //条形进度条以父元素的宽高作为标准
    position: relative;
    width: 100%;
    height: 100%;
    .progress_line {
      position: relative;
      background: #61a8ff;
      height: 100%;
      .progress {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        // transition: 0.3s width;
        .progress_text {
          position: absolute;
          right: 4px;
          top: 0;
          height: 100%;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .progress_circle {
      position: relative;
      .circle_text {
        width: 26px;
        text-align: center;
        font-size: 12px;
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
</style>
