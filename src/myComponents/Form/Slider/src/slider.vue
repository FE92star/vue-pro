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
    left: 0, // 当前距离
    current: 0, // 当前值
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

  },
  methods: {
    dragFn(e) {
      console.log(e.changedTouches[0].clientX);
    }
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
