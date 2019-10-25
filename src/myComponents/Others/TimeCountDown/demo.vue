<template>
  <div>
    <!-- 接口拿到serverTime组件开始渲染 -->
    <time-count-down endTime="2019-10-25 14:40:00" @over="timeOverFn" fontSize="18px" fontColor="red"></time-count-down>
  </div>
</template>
<script>
  export default {
    methods: {
      timeOverFn() {
        console.log('over');  
      }
    },
  }
</script>