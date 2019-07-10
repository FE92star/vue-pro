<template lang="html">
  <div class="">
    <bao-checkbox v-model="bool" shape="square">复选框选项</bao-checkbox>
  </div>
</template>

<script>
import BaoCheckbox from './checkbox.vue'

export default {
  name: 'demo',
  data() {
    return {
      bool: true
    }
  },
  components: {
    BaoCheckbox
  }
}
</script>

<style lang="css" scoped>
</style>
