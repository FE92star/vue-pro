<template lang="html">

</template>

<script>
export default {
  name: 'demo',
  mounted() {
    this.$toast.show('')
    setTimeout(() => {
      this.$toast.show({
        message: '数据请求失败',
        position: 'top',
        type: 'warning'
      })
    }, 5000)
  }
}
</script>

<style lang="css" scoped>
</style>
