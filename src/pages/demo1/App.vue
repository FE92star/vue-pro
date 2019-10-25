<template lang="html">
  <div class="page">
    <throttle :time="1000" events="click">
      <button @click="postFn"></button>
    </throttle>
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="empty"></div>
    <!-- 两个盒子用于都是合成层，但是top盒子通过初始化的盒子面积更小，而transform的scale可以直接在GPU上进行，因此所占的内存空间会更小 -->
    <img src="//r.51gjj.com/act/release/img/20180518_licai_fuli_icon.png" alt="" ref="img">
    <!-- <div class="empty"></div> -->
    <!-- <img src="//r.51gjj.com/act/release/img/20180518_licai_fuli_icon.png" alt="" ref="img"> -->
    <p class="line">line-height</p>
  </div>
</template>

<script>
import { debounceFn, throttleFn } from '@/common/js/optimize.js'
import { decarFn } from '@/common/js/base'
import { log } from 'util';

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
      document.addEventListener('scroll', debounceFn(function() {
        console.log(6666);
      }, 1000))
    },
    pageFn(top) {
      console.log(top);
    },
    postFn() {
      let _this = this
      console.log('post')
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
    this.scrollFn()
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
  .top,
  .bottom {
    position: absolute;
    will-change: transform;
  }
  .bottom {
    width: 100px;
    height: 100px;
    top: 20px;
    left: 20px;
    z-index: 3;
    background: rosybrown;
  }
  .top {
    width: 10px;
    height: 10px;
    left: 200px;
    top: 200px;
    transform: scale(10);
    z-index: 5;
    background: indianred;
  }
  .empty {
    width: 100%;
    min-height: 800px;
  }
}
.line {
  width: 100%;
  line-height: 200%;
}
</style>
