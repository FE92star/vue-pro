<template lang="html">
  <page-wrap :state="pageState">
    <p style="margin-bottom: 500px;">666</p>
    <p style="margin-bottom: 500px;">666</p>
    <p style="margin-bottom: 500px;">666</p>
  </page-wrap>
</template>

<script>
import { debounceFn, throttleFn } from '@/common/js/optimize.js'

export default {
  name: 'demo1',
  data: () => ({
    pageState: 'loading'
  }),
  methods: {
    scrollFn() {
      document.addEventListener('scroll', throttleFn(function() {
        console.log(6666);
      }, 1000))
    },
  },
  mounted() {
    this.scrollFn()
    setTimeout(() => {
      this.pageState = 'success'
    }, 500)
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
}
</style>
