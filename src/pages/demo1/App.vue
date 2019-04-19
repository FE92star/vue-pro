<template lang="html">
  <div class="page">
    <throttle :time="1000" events="click">
      <button @click="postFn"></button>
    </throttle>
    <div class="empty"></div>
    <img src="//r.51gjj.com/act/release/img/20180518_licai_fuli_icon.png" alt="" ref="img">
  </div>
</template>

<script>
import { debounceFn, throttleFn } from '@/common/js/optimize.js'

export default {
  name: 'demo1',
  data: () => ({
    pageState: 'loading',
    count: 0,
  }),
  methods: {
    scrollFn() {
      document.addEventListener('scroll', throttleFn(function() {
        console.log(6666);
      }, 1000))
    },
    pageFn(top) {
      console.log(top);
    },
    postFn() {
      let _this = this
      console.log(6666);
      // throttleFn(function() {
      //   _this.count ++
      //   console.log(_this.count);
      // }, 1000)
    }
  },
  mounted() {
    // this.scrollFn()
    let _this = this
    // const button = this.$refs.button
    // button.addEventListener('click', throttleFn(function() {
    //   _this.count ++
    //   console.log(_this.count);
    // }, 1000))
    // setTimeout(() => {
    //   this.pageState = 'success'
    // }, 500)
    this.$nextTick(() => {
      this.$refs.img.scrollIntoView(false)
    })
  }
}
</script>

<style lang="less">
.page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  button {
    width: 250px;
    height: 80px;
    background: rgba(250, 156, 156, .6);
    border: 0;
    outline: 0;
  }
  .empty {
    width: 100%;
    min-height: 800px;
  }
}
</style>
