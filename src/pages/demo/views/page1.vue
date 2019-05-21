<template lang="html">
  <div class="">
    page1
    <button type="button" name="button" @click="goPage" style="background: red;"></button>
  </div>
</template>

<script>
import { numberFormat } from '@/common/js/number'

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
    // this.simuTimer()
    console.log(numberFormat().formate(68999.88, 2));
    setTimeout(function(){
        console.log('定时器开始啦')
    });

    new Promise(function(resolve){
        console.log('马上执行for循环啦');
        for(var i = 0; i < 10000; i++){
            i == 9999 && resolve();
        }
    }).then(function(){
        console.log('执行then函数啦')
    });

    console.log('代码执行结束');
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
