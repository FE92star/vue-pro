<template lang="html">
  <div class="">
    page2
    <button type="button" name="button" @click="goPage"></button>
  </div>
</template>

<script>
export default {
  methods: {
    goPage() {
      // this.$router.push('/page3')
      this.$router.goBack(-1)
    }
  },
  mounted() {
    Global.listenPage({
      time: 5,
      onload: function() {
        console.log('page2');
      }
    })
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
