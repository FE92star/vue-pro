<template lang="html">
  <div class="">
    <bao-upload @multChange="multFn" @change="changeFn" :userLimit="['png']" drag multiple @unDrag="dragFn"></bao-upload>
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
    },
    dragFn(files) {
      console.log(files);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
