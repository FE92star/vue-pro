<template lang="html">
  <div class="v_input" :style="{width: width + 'px'}">
    <input
      :type="type"
      name="input_v"
      ref="input"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :style="{color: color}"
      :value="value"
      :disabled="disabled"
      @input="updateVal"
      @focus="$emit('focus', $event.target.value)"
    >
  </div>
</template>

<script>
import { addClass } from '@/common/js/dom.js'

export default {
  name: 'bao-input',
  props: {
    type: {
      type: String,
      default: 'text' // 'text'和'number'和'password'三种输入类型
    },
    width: {
      type: Number,
      default: 180
    },
    value: {},
    placeholder: String,
    color: {
      type: String,
      default: '#606266'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: Number
  },
  methods: {
    updateVal(e) {
      this.$emit('input', e.target.value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.disabled) {
        addClass(this.$refs.input, 'input_disable')
      }
    })
  }
}
</script>

<style lang="less" scoped>
.v_input {
  position: relative;
  font-size: 14px;
  display: inline-block;
}
input {
  outline: 0;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  background: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  // color: #606266;
  display: inline-block;
  padding: 0 15px;
  font-size: inherit;
  width: 100%;
  height: 40px;
  line-height: 40px;
  transition: border-color .2s;
  &:focus {
    outline: none;
    border-color: #409eff;
  }
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}
input:focus:-moz-placeholder {
  color: transparent;
}
input:focus::-moz-placeholder {
  color: transparent;
}
/* 设置placeholder字体颜色 */
input::-webkit-input-placeholder {
 color: #CCCCCC;
}
input::-moz-input-placeholder {
 color: #CCCCCC;
}
input::-ms-input-placeholder {
 color: #CCCCCC;
}
// 去除input[number]的样式
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.input_disable {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: c0c4cc;
  cursor: not-allowed;
}
</style>
