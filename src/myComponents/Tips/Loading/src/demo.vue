<template lang="html">

</template>

<script>
export default {
  name: 'demo',
  mounted() {
    this.$load.show()
    setTimeout(() => {
      this.$load.hide()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>

</style>
