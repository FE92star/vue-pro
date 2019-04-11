<template lang="html">
  <div class="">
    <button type="button" name="button" @click="showFn">dilog</button>
    <button type="button" name="button" @click="popFn" class="color1">pop</button>
    <button type="button" name="button" @click="toastFn" class="color2">Toast</button>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    showFn() {
      this.$dialog.confirm({
        animate: 'bounce',
        title: '请先解锁',
        texts: `<p>本章节内容还未解锁，请先解锁~</p>`,
        btn: ['取消', '确定'],
        cancleFn: () => {
          this.$dialog.cancel()
        },
        confirmFn: () => {
          this.$dialog.cancel()
        }
      })
    },
    popFn() {
      this.$pop.show({
        animate: 'slide',
        copyFn: () => {
          this.$pop.hide()
        }
      })
    },
    toastFn() {
      this.$toast.show('数据错误')
      setTimeout(() => {
        this.$toast.show({
          message: '数据请求失败',
          position: 'top',
          type: 'warning'
        })
      }, 5000)
    }
  },
  mounted() {

  },
  created() {

  }
}
</script>

<style lang="less">
.color1 {
  background: red !important;
}
.color2 {
  background: orange !important;
}
button {
  width: 120px;
  height: 40px;
  border: 0;
  outline: 0;
  background: blue;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  margin: 24px auto;
  display: block;
}
</style>
