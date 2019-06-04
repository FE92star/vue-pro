<template lang="html">
  <div class="radio_check" :style="{width: radioWidth}">
    <input type="radio" name="" value="" id="radio" ref="radio">
    <label for="radio">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'bao-radio',
  data: () => ({

  }),
  props: {
    label: {
      type: String,
      default: ''
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radioWidth() { // 计算radio元素宽带
      let cnNum = 0
      let regExp = /[\u4e00-\u9fa5]/ // 匹配中文
      let arr = this.label.split('')
      for(let i=0; i<arr.length; i++) {
        if(arr[i].match(regExp)) {
          cnNum ++
        }
      }
      let len = this.label.length
      let width = 30 + 16 * cnNum + 10 * (len - cnNum)
      return `${width}px`
    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      if(this.check) {
        this.$refs.radio.setAttribute("checked", true)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.radio_check {
  position: relative;
  padding-right: 12px;
  min-width: 62px;
  height: 35px;
  // display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}
.radio_check > input {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
}
.radio_check > label {
  position: absolute;
  left: 30px;
  line-height: 20px;
  height: 20px;
  top: 0px;
}
.radio_check > label:before {
  content: '';
  position: absolute;
  left: -30px;
  top: 0px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}
.radio_check > label:after {
  content: '';
  position: absolute;
  left: -30px;
  top: 0px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 6px;
  margin-left: 6px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}
.radio_check input[type='radio']:checked + label:before {
  border-color: #4cd764;
}
.radio_check input[type='radio']:checked + label:after {
  background: #4cd764;
}
</style>
