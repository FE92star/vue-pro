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
import { decarFn } from '@/common/js/base'

export default {
  name: 'demo1',
  data: () => ({
    pageState: 'loading',
    count: 0,
    array: [
      [1, 2, 3],
      ['a', 'b', 'c', 'd'],
      ['x', 'y', 'z'],
      ['p', 'q', 'o']
    ]
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
    }
  },
  mounted() {
    let arr = [1, 2, 3]
    let newArr = [...arr]
    newArr.push(4)
    console.log(arr, newArr);
    const randomCode = (v) => {
      let codeArr = []
      for(let i=0; i<v; i++) {
        codeArr.push(Number.parseInt(Math.random()*10))
      }
      return codeArr.join('')
    }
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
