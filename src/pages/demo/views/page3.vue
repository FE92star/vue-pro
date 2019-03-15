<template lang="html">
  <div class="">
    page3
    <button type="button" name="button" @click="backPage"></button>
  </div>
</template>

<script>
export default {
  methods: {
    backPage() {
      // this.$router.replace('/page2')
      this.$router.goBack(-2)
    }
  }
}
</script>

<style lang="less">
button {
  width: 100px;
  height: 40px;
  border: none;
  display: block;
  outline: none;
  background: green;
  margin-top: 100px;
}
</style>
