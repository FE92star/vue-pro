<template>
  <div class="progress_bar_component" ref='bar_wrap'>
    <div class="progress_bar_wrap">
      <div ref="bar" class="progress_bar_contain" :style="{width: `${left}px`}"></div>
      <div ref="ball" class="progress_bar_drag" :style="{left: `${left}px`}" @touchmove="dragFn">
        <slot>
          <img src="//r.51gjj.com/image/static/icon-nstSlider-mark.png" alt="">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    // step: 100,
    left: 0,
    bar: {
      x: 0,
      y: 0
    },
    current: 0
  }),
  props: {
    value: [String, Number],
    max: {
      type: [String, Number],
      default: 100
    },
    min: {
      type: [String, Number],
      default: 0
    },
    step: {
      type: [String, Number],
      default: 1
    }
  },
  watch: {
    value: function(n, o) {
      this.left = this.getResValue(n)
      this.current = this.getValue(this.left)
    }
  },
  methods: {
    getValue(left) {
      // 通过长度返回值
      let max = this.max
      let min = this.min
      let s = (max-min)/100
      if(this.bar.width<1) {
        let wrap = this.$refs.bar_wrap.getBoundingClientRect()
        this.bar = wrap
      }
      let w = this.bar.width
      let step = w/100
      let v = Math.ceil((left/step)*s)+min
      if(v>max) {
        v=max
      }
      if(v<min) {
        v=min
      }
      let val = Math.floor(v/this.step)*this.step<0 ? min : Math.floor(v/this.step)*this.step
      return val
    },
    getResValue(value) {
      // 通过值返回长度
      let max = this.max
      let min = this.min
      let s = (max-min)/100
      if(this.bar.width<1) {
        let wrap = this.$refs.bar_wrap.getBoundingClientRect()
        this.bar = wrap
      }
      let w = this.bar.width
      let step = w/100
      let xx = Math.floor((value-min)/s*step)
      return xx
    },
    dragFn(e) {
      if(this.bar.width<1) {
        let wrap = this.$refs.bar_wrap.getBoundingClientRect()
        this.bar = wrap
      }
      this.left = e.changedTouches[0].clientX-10

      if(e.changedTouches[0].clientX-10 < 0) {
        this.left = 0
      }
      if(e.changedTouches[0].clientX-10 > this.bar.width) {
        this.left = this.bar.width
      }
      this.current = this.getValue(this.left)
      this.$emit('change', this.current)
      e.preventDefault()
    }
  },
  mounted() {
    let wrap = this.$refs.bar_wrap.getBoundingClientRect()
    this.bar = wrap
    this.current = this.value
    if(this.value<this.min) {
      this.current = this.min
    }
    if(this.value>this.max) {
      this.current = this.max
    }
    this.left = this.getResValue(this.current)
  }
}
</script>

<style scoped lang="less">
@full_percent: 100%;
@height: 6px;
@background: rgb(36, 91, 233);
.progress_bar_component {
  position: relative;
  width: 100%;
  .progress_bar_wrap {
    position: absolute;
    width: 100%;
    background: #bcc0ca;
    border-radius: 5px;
    height: @height;
    // overflow: hidden;
    .progress_bar_contain {
      position: absolute;
      top: 0;
      left: 0;
      background: -webkit-linear-gradient(right, #439df8 0%,#7370ff 100%);
      background: linear-gradient(to right, #439df8 0%,#7370ff 100%);
      border-radius: 5px;
      width: 10px;
      height: @height
    }
    .progress_bar_drag {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }
    }
  }
}
</style>
