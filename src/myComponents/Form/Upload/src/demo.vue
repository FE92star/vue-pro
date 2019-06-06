<template lang="html">
  <div class="">
    <bao-upload @multChange="multFn" @change="changeFn" :userLimit="['png']"></bao-upload>
  </div>
</template>

<script>
import BaoUpload from './upload.vue'

export default {
  methods: {
    multFn(files) {
      console.log(files);
    },
    changeFn(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
