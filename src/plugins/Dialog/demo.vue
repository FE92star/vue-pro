<script>
export default {
  methods: {
    showFn() {
      this.$dialog.confirm({
        animate: 'bounce',
        title: '请先解锁',
        texts: `本章节内容还未解锁，请先解锁~`,
        btn: `确定`,
        checkFn: () => {
          this.$dialog.cancel()
        }
      })
    }
  }
}
</script>
