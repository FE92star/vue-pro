<template lang="html">
  <div class="">
    page1
    <button type="button" name="button" @click="goPage"></button>
  </div>
</template>

<script>
export default {
  methods: {
    goPage() {
      this.$router.push('/page2')
    }
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
  background: blue;
  margin-top: 100px;
}
</style>
