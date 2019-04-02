<template lang="html">
  <div class="">
    <calendar ref="calender" :isShowControl="true" :markDateMore="markMoreLists" :markDate="markDateLists" initDate="initDateStr"></calendar>
  </div>
</template>

<script>
import calendar from '../index.js'

export default {
  data: () => ({
    initDateStr: '2019-04-01',
    markMoreLists: [
      {
        date: '2019-03-05',
        index: 0
      },
      {
        date: '2019-03-06',
        index: 1
      }
    ],
    markDateLists: ['2019-03-20', '2019-03-21']
  }),
  components: {
    calendar
  },
  mounted() {
    if(this.initDateStr && this.$refs.calender) {
      this.$refs.calender.refresh(); //组件渲染需要时间，延时获取组件刷新
    }
  }
}
</script>

<style lang="less">

</style>
