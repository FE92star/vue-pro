<template lang="html">
  <div class="">
    page2
    <button type="button" name="button" @click="goPage"></button>
  </div>
</template>

<script>
import reload from '@/common/js/reload'

export default {
  methods: {
    goPage() {
      // this.$router.push('/page3')
      this.$router.goBack(-1)
    }
  },
  mounted() {
    reload({href: window.location.href, time: 1000}).change({
      onload() {
        console.log('this is a page2 onload function')
      },
      onclose() {
        console.log('this is a page2 onclose function')
      }
    }).focus().blur()
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
  background: red;
  margin-top: 100px;
}
</style>
