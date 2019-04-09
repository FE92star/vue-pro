<template lang="html">

</template>

<script>
export default {
  methods: {
    toaFn() {
      this.$toast.show('数据错误')
      setTimeout(() => {
        this.$toast.show({
          message: '数据请求失败',
          position: 'top',
          type: 'warning'
        })
      }, 5000)
    }
  }
}
</script>

<style lang="css">
</style>
