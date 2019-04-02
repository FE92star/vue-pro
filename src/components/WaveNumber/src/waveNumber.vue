<template lang="html">
  <span>
    {{displayValue}}
  </span>
</template>

<script>
import { requestAnimationFrame, cancelAnimationFrame } from '@/common/js/requestAnimationFrame'
import { formatNumber } from '@/common/js/number'

export default {
  name: 'wave-number',
  data: () => ({
    localStartVal: this.startVal, //本地保存起始值
    displayValue: 0, //展示值
    printVal: null, //动画执行过程中非格式化展示值
    localDuration: this.duration,
    startTime: null, //开始时间
    timestamp: null, //时间戳
    rAF: null //requestAnimationFrame动画对象
  }),
  props: {
    startVal: { //起始值
      type: Number,
      default: 0
    },
    endVal: { //终止值
      type: Number,
      default: 2019
    },
    duration: { //动画持续时间
      type: Number,
      default: 3000
    },
    autoplay: { //是否自执行
      type: Boolean,
      default: true
    },
    decimals: { //保留位数
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0
      }
    },
    decimal: { //小数整数分隔符
      type: String,
      default: '.'
    },
    separator: { //千分位分隔符
      type: String,
      default: ','
    },
    prefix: { //首分隔符
      type: String,
      default: ''
    },
    suffix: { //尾分隔符
      type: String,
      default: ''
    },
    useEasing: { //是否使用默认动画
      type: Boolean,
      default: true
    },
    easingFn: { //动画函数
      type: Function,
      default: (t, b, c, d) => {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
      }
    }
  },
  computed: {
    countDown() { //判断是否从大到小翻转
      return this.startVal > this.endVal
    }
  },
  watch: {
    startVal() {
      if(this.autoplay) {
        this.start()
      }
    },
    endVal() {
      if(this.autoplay) {
        this.start()
      }
    }
  },
  methods: {
    start() {
      this.localStartVal = this.startVal;
      this.startTime = null;
      this.localDuration = this.duration;
      this.rAF = requestAnimationFrame(this.countFn);
    },
    countFn(timestamp) {
      if(!this.startTime) {
        this.startTime = timestamp
      }
      this.timestamp = timestamp
      const progress = timestamp - this.startTime
      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration)
        } else {
          this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration);
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - ((this.localStartVal - this.endVal) * (progress / this.localDuration));
        } else {
          this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration);
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal;
      } else {
        this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal;
      }
      this.displayValue = formatNumber(this.printVal)
      if (progress < this.localDuration) {
        this.rAF = requestAnimationFrame(this.countFn);
      } else {
        this.$emit('endWave');
      }
    }
  },
  mounted() {
    if(this.autoplay) {
      this.start()
    }
  },
  destroyed() {
    cancelAnimationFrame(this.rAF)
  }
}
</script>

<style lang="less">
span {
  display: inline-block;
}
</style>
