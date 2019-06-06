<template lang="html">
  <div class="">
    <input type="file" name="" value="" id="file">
  </div>
</template>

<script>
export default {
  name: 'bao-upload',
  data: () => ({

  }),
  methods: {
    fileRead() {
      let inputDom = document.getElementById('file')
      inputDom.addEventListener('change', function() {
        let files = inputDom.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onload = function() {
          console.log(this.result)
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fileRead()
    })
  }
}
</script>

<style lang="less" scoped>

</style>
