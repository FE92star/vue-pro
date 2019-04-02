<script>
export default {
  methods: {
    popFn() {
      this.$pop.show({
        animate: 'slide',
        copyFn: () => {
          this.$pop.hide()
        }
      })
    }
  }
}
</script>
