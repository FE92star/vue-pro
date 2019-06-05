<template lang="html">
  <div class="form-check__box">
    <input
      type="checkbox"
      name="form_checkbox"
      ref="checkbox"
      :id="`id${checkID}`"
      v-model="model"
      @click="handeleChange"
    >
    <label :for="`id${checkID}`">
      <slot></slot>
    </label>
  </div>
</template>

<script>
import { addCssStyle } from '@/common/js/dom.js'

export default {
  name: 'bao-checkbox',
  data: () => ({
    checkID: 'checkbox'
  }),
  props: {
    value: {},
    shape: { // 复选框的形状['circle', 'square']-圆形和方形两种
      type: String,
      default: 'circle'
    }
  },
  computed: {
    model: { // 双向绑定
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$refs.checkbox && (this.$refs.checkbox.checked = this.model === this.value)
      }
    }
  },
  methods: {
    handeleChange() {
      this.$emit('change', this.model)
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      let cssStyle = `.form-check__box label:before {border-radius: 0 !important;}`
      if(this.shape === 'square') {
        addCssStyle(cssStyle)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.form-check__box {
  position: relative;
  height: 30px;
}
.form-check__box input[type='checkbox'] {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
}
.form-check__box label {
  position: absolute;
  left: 30px;
  top: 0;
  height: 20px;
  line-height: 20px;
}
.form-check__box label:before {
  content: '';
  position: absolute;
  left: -30px;
  top: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 50%;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}

.form-check__box label:after {
  content: '';
  position: absolute;
  left: -22px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: 0;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #fff;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}
.form-check__box input[type='checkbox']:checked + label {
  color: #409eff;
}
.form-check__box input[type='checkbox']:checked + label:before {
  background: #409eff;
  border-color: #409eff;
}
.form-check__box input[type='checkbox']:checked + label:after {
  background: #409eff;
}
</style>
