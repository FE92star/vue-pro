<!--
  @date 2019/10/25 
  @author fengqian
  @desc 活动倒计时组件 -->
<!-- 传入的时间格式可以包括：
    2019/11/11 23:59:59
    2019-11-11 23:59:59 // IOS不支持'-'写法，因此需要用'/'代替
    Mon Nov 11 2019 23:59:59 GMT+0800 (中国标准时间)——标准格式
-->
<template>
  <span :style="{fontSize: fontSize, color: fontColor}">{{ days }}天{{ hours }}小时{{ minutes }}分{{ seconds }}秒</span>
</template>
<script>
const interval = 1000 // 倒计时常量
  
export default {
  name: 'time-count-down',
  data: () => ({
    // 倒计时展示的时间值
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    timer: null // 定时器实例
  }),
  props: {
    // 当前服务器时间，默认为当前客户端时间
    currentServerTime: {
      type: [Date, String],
      default: () => {
        return new Date()
      }
    },
    // 倒计时结束时间
    endTime: {
      type: String,
      default: 'Mon Nov 11 2019 23:59:59 GMT+0800 (中国标准时间)'
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '14px'
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: '#000'
    }
  },
  methods: {
    /* 初始化时间 */
    initTime() {
      let vm = this
      let currentServerTime, 
      endTime, 
      currentServerTimeStamp, 
      endTimeStamp, 
      totalTimeStamp,
      currentClientTimeStamp,
      timer
      // 变量赋值
      currentServerTime = this.timeFormate(this.currentServerTime)
      endTime = this.timeFormate(this.endTime)
      currentServerTimeStamp = new Date(currentServerTime).getTime() // 当前服务器时间戳
      currentClientTimeStamp = new Date().getTime() // 当前客户端时间戳
      const minusTimeStamp = currentServerTimeStamp - currentClientTimeStamp // 当前客户端时间和服务器时间戳的差值为常数值
      endTimeStamp = new Date(endTime).getTime() // 服务器结束时间戳
      // 不采用setInterval倒计时，是因为JS等到空闲的时候才会执行队列里面的代码，因此导致队列里积累的异步任务太多，引起任务执行的延时误差
      const timerFn = () => {
        currentClientTimeStamp = new Date().getTime()
        totalTimeStamp = endTimeStamp - currentClientTimeStamp - minusTimeStamp// 倒计时剩余时间的时间戳
        if(totalTimeStamp < 0) {
          this.$emit('over')
          clearInterval(timer)
          return
        }else {
          timer = setTimeout(() => {
            timerFn()
          }, 1000)
        }
        // 计算时间
        vm.days = Math.floor(totalTimeStamp / 1000 / 60 / 60 / 24) // 天数
        vm.days = vm.days < 10 ? `0${vm.days}` : vm.days // 格式化处理
        vm.hours = Math.floor(totalTimeStamp / 1000 / 60 / 60 % 24) // 小时数
        vm.hours = vm.hours < 10 ? `0${vm.hours}` : vm.hours
        vm.minutes = Math.floor(totalTimeStamp / 1000 / 60 % 60) // 分钟数
        vm.minutes = vm.minutes < 10 ? `0${vm.minutes}` : vm.minutes
        vm.seconds = Math.floor(totalTimeStamp / 1000 % 60) // 秒数
        vm.seconds = vm.seconds < 10 ? `0${vm.seconds}` : vm.seconds
      }
      this.timer = setTimeout(() => {
        timerFn()
      }, 1000)
    },
    /* 格式化时间 */
    timeFormate(time) {
      let regExp = new RegExp(/-/g)
      if(regExp.test(time)) {
        return time.replace(/-/g, '/')
      }
      return time
    }
  },
  mounted() {
    this.initTime()
  },
  created() {
    
  },
  beforeDestroy() { // 组件实例销毁之前清楚定时器
    window.clearInterval(this.timer)
  },
}
</script>
<style lang="less" scoped>

</style>