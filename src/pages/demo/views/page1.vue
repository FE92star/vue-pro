<template lang="html">
  <div class="">
    page1
    <button type="button" name="button" @click="goPage" style="background: red;"></button>
  </div>
</template>

<script>
import { numberFormat } from '@/common/js/number'
import reload from '@/common/js/reload'


export default {
  methods: {
    goPage() {
      this.$router.push('/page2')
    },
    simuTimer() {
      function timer() {
        console.log(666);
        let time = setTimeout(() => {
          timer()
          clearTimeout(time)
        }, 1000)
      }
      timer()
    }
  },
  mounted() {
    // Global.listenPage({
    //   time: 5,
    //   onload: function() {
    //     console.log('page1');
    //   }
    // })
    // reload({href: window.location.href, time: 1000}).change({
    //   onload() {
    //     console.log('this is a page1 onload function')
    //   },
    //   onclose() {
    //     console.log('this is a page1 onclose function')
    //   }
    // }).focus().blur()
    // const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
    // console.log(isType('Array')([]));
    // const calculate = (total, currentVal) => {
    //   return total + currentVal
    // }
    // console.log([1, 2, 3, 4].reduce(calculate, 5));
    // (function(num) {
    //   var a = 1
    //   console.log(num + 10);
    // })(10)
    const fn = () => {
      console.log('fn');
    }
    const newFn = fn.before(function() {
      console.log('before');
    }).after(function() {
      console.log('after');
    })
    newFn()
  }
}
</script>

<style lang="less" scoped>
button {
  width: 100px;
  height: 40px;
  border: none;
  display: block;
  outline: none;
  background: blue !important;
  margin-top: 100px;
}
</style>
