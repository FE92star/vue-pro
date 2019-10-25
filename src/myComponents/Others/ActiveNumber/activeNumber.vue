<template>
  <span class="init-active-wrap" v-html="endVal" :class="{'is-hidden': !isReady}"></span>
</template>
<script>
import ActiveNumber from './src/index'

export default {
  name: 'active-number',
  data: () => ({
    isReady: false
  }),
  props: {
    endVal: { // 动画结束数字
      type: Number,
      default: 100
    },
    startNum: { // 动画开始数字
      type: Number,
      default: 0
    },
    isNumber: { // 是否为数字动画
      type: Boolean,
      default: true
    },
    animateCount: { // 数字动画进行的次数
      type: Number,
      default: 20
    }
  },
  methods: {
    initAnimateNumber() {
      if(this.endVal === 0 || this.endVal === '') return
      this.isReady = true // 数字已获取
      let initNumber = new ActiveNumber('.init-active-wrap', {
        startNum: this.startNum,
        isNumber: this.isNumber,
        animateCount: this.animateCount,
        onAnimateEnd: () => {
          this.$emit('end') // 动画结束的回调
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initAnimateNumber()
    })
  },
  watch: {
    endVal(oldVal, newVal) {
      this.isReady = false // 进入页面数字未获取
      setTimeout(() => {
        this.initAnimateNumber()
      }, 30)
    }
  }
}

</script>
<style lang="less" scoped>
.is-hidden {
  opacity: 0;
}
</style>