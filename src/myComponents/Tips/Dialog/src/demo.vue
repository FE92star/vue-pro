<template lang="html">

</template>

<script>
export default {
  name: 'demo',
  mounted() {
    this.$dialog.confirm({
      animate: 'bounce',
      title: '请先解锁',
      texts: `本章节内容还未解锁，请先解锁~`,
      btn: ['取消', '确定'],
      confirmFn: () => {
        this.$dialog.cancel()
        window.location.href = 'https://www.baidu.com'
      },
      cancleFn: () => {
        this.$dialog.cancel()
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
