<template lang="html">
  <div class="">
    <p></p>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    compose(...fns) {
      return function (x) {
        return fns.reduceRight(function(arg,fn){
            return fn(arg);
        },x)
      }
    }
  },
  mounted() {
    console.log(new Date() instanceof Date);
    // console.log(/.+\?(.+)$/.exec('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'));
    var regex = /\d{2,5}?/g;
    var string = "123 1234 12345 123456";
    console.log( string.match(regex) );
  }
}
</script>

<style lang="less" scoped>
p {
  border: 1px solid #cdcdcd;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
}
</style>
