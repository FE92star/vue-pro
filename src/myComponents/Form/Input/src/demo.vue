<template lang="html">
  <div class="">
    <bao-input type="text" placeholder="请输入金额" :maxlength="8" @input="inputFn" v-model="money"></bao-input>
  </div>
</template>

<script>
import BaoInput from './input.vue'

export default {
  name: 'demo',
  data: () => ({
    money: 100
  }),
  components: {
    BaoInput
  },
  methods: {
    inputFn(v) {
      console.log(v);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
