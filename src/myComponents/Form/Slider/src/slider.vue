<template lang="html">
  <div class="slider__wrap" ref="wrap">
    <div class="slider_bar" ref="bar" :style="{width: `${left}px`}"></div>
    <div class="slider_button_wrap" ref="ball" :style="{left: `${left}px`}" @touchmove="dragFn">
      <slot>
        <div class="slider__button"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bao-slider',
  data: () => ({
    left: 0, // 当前滑块的百分比距离
    currentVal: 0, // 当前滑块位置所代表的值
    wrapObj: {
      width: 0,
      l: 0
    }
  }),
  props: {
    value: [String, Number], // 默认值
    min: { // 最小值
      type: [String, Number],
      default: 0
    },
    max: { // 最大值
      type: [String, Number],
      default: 100
    },
    step: { // 步数
      type: [String, Number],
      default: 1
    }
  },
  watch: {
    currentVal(newVal, oldVal) {
      if(newVal) {
        this.left = this.getPosition(newVal)
        this.currentVal = this.getValue(this.left)
      }
    }
  },
  methods: {
    // 通过滑块位置获取当前值
    getValue(left) {
      let min = this.min
      let max = this.max
      let range = (max - min) / 100 // 划分100份
      if(this.wrapObj.width < 1) {
        let obj = this.$refs.wrap.getBoundingClientRect()
        this.wrapObj = obj
      }
      let w = this.wrapObj.width
      let step = w / 100 // 宽度划分100份
      let value = Math.ceil((left / step) * range) + min
      if(value > max) {
        value = max
      }
      if(value < min) {
        value = min
      }
      let val = Math.floor(value / this.step) * this.step < 0 ? min : Math.floor(value / this.step) * this.step
      return val
    },
    // 通过当前值获取滑块位置
    getPosition(v) {
      let min = this.min
      let max = this.max
      let range = (max - min) / 100 // 划分100份
      if(this.wrapObj.width < 1) {
        let obj = this.$refs.wrap.getBoundingClientRect()
        this.wrapObj = obj
      }
      let w = this.wrapObj.width
      let step = w / 100 // 宽度划分100份
      let x1 = Math.floor((v - min) / range * step) // 滑块所在位置
      let x2 = Math.floor((v + this.step - min) / range * step)
      // 避免闪跳
      if(this.left < x2 && this.left > x1) {
        return this.left
      }
      return x1
    },
    dragFn(e) {
      if(this.wrapObj.width < 1) {
        let obj = this.$refs.wrap.getBoundingClientRect()
        this.wrapObj = obj
      }
      this.left = e.changedTouches[0].clientX - 10
      if(e.changedTouches[0].clientX - 10 < 0) {
        this.left = 0
      }
      if(e.changedTouches[0].clientX - 10 > this.wrapObj.width) {
        this.left = this.wrapObj.width
      }
      this.currentVal = this.getValue(this.left)
      this.$emit('change', this.currentVal)
      e.preventDefault()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapObj = this.$refs.wrap.getBoundingClientRect()
    })
    this.currentVal = this.value
    if(this.value < this.min) {
      this.currentVal = this.min
    }
    if(this.value > this.max) {
      this.currentVal = this.max
    }
    this.left = this.getPosition(this.currentVal)
  }
}
</script>

<style lang="less" scoped>
.slider__wrap {
  position: relative;
  width: 100%;
  height: 6px;
  background: #e4e7ed;
  border-radius: 3px;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  .slider_bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 6px;
    width: 50%;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #409eff;
  }
  .slider_button_wrap {
    width: 36px;
    height: 36px;
    position: absolute;
    left: 50%;
    top: -15px;
    transform: translateX(-50%);
    background-color: transparent;
    text-align: center;
    line-height: normal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    .slider__button {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #409eff;
      transition: all .2s;
      user-select: none;
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 36px;
      height: 36px;
      display: block;
    }
  }
}
</style>
