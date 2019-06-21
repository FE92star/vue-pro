<template lang="html">
  <div class="">
    <bao-pagination
      :range="100"
      :current="10"
      @preFn="fn1"
      @nextFn="fn2"
      @change="fn3"
    >
    </bao-pagination>
  </div>
</template>

<script>

export default {
  name: 'demo',
  components: {
    BaoPagination: () => import('./pagination.vue')
  },
  methods: {
    fn1(num, range) {
      console.log(num, range);
    },
    fn2(num, range) {
      console.log(num, range);
    },
    fn3(val, range) {
      console.log(val, range);
    },
  }
}
</script>

<style lang="less" scoped>

</style>
