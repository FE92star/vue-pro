<template>
  <span class="form__switch" ref="form">
    <div class="switch_box">
      <input type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('change', $event.target.checked)"
        :disabled="disabled"
        ref="switch"
      >
      <transition name="bounce_switch">
        <div class="bg_switch" :style="{'backgroundColor': activeColor, 'width': switchWidth}" v-if="checked"></div>
      </transition>
      <div class="circle" :class="{active: checked}"></div>
    </div>
  </span>
</template>

<script>
import { addClass } from '@/common/js/dom.js'

export default {
  name: 'bao-switch',
  data: () => ({
    switchWidth: 40
  }),
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeColor: {
      type: String,
      default: 'rgb(29, 199, 20)'
    },
  },
  mounted() {
    this.switchWidth = this.width || 40
    this.$nextTick(() => {
      if(this.disabled) {
        let sDom = this.$refs.switch
        let fDom = this.$refs.form
        addClass(sDom, 'switch_disabled')
        addClass(fDom, 'form_disabled')
      }
    })
  }
}
</script>

<style lang="less">
.form__switch {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  .switch_box {
    width: 40px;
    height: 20px;
    border: 1px solid #eee;
    border-radius: 30px;
    background: #ddd;
    overflow: hidden;
    position: relative;
    .bg_switch {
      background: rgb(38, 148, 228);
      width: 100%;
      left: 0;
      height: 100%;
      border-radius: 30px;
      transform-origin: 0 50%;
      top: 0;
    }
    .circle {
      width: 20px;
      height: 20px;
      background: #fff;
      box-shadow: 2px 2px 2px #ddd;
      border-radius: 40px;
      position: absolute;
      left: 0;
      top: 0;
      transition: all .4s linear;
    }
    .active {
      transform: translate(20px);
    }
  }
  input {
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
    top: 0;
    z-index: 5;
    opacity: 0;
    margin: 0;
    cursor: pointer;
  }
}
.bounce_switch-enter, .bounce_switch-leave-to {
  transform: scaleX(0);
  opacity: 0;
}
.bounce_switch-enter-active, .bounce_switch-leave-active {
  transition: all .4s ease-out;
}
.switch_disabled {
  cursor: not-allowed !important;
	background-image: none !important;
}
.form_disabled {
  filter: opacity(.58) !important;
}
</style>
