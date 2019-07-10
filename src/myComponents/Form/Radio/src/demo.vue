<template lang="html">
  <div class="">
    <bao-radio label="1" v-model="radio" @input="check">选项1</bao-radio>
    <bao-radio label="2" v-model="radio" @change="change">选项2</bao-radio>
  </div>
</template>

<script>
import BaoRadio from './radio.vue'

export default {
  name: 'demo',
  data: () => ({
    radio: '1'
  }),
  components: {
    BaoRadio
  },
  methods: {
    check(val) {
      console.log(val)
    },
    change(v) {
      console.log(v, this.radio)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
