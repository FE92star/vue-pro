<template lang="html">
  <div class="">
    <bao-switch v-model="swiVal" :disabled="false"></bao-switch>
  </div>
</template>

<script>
import BaoSwitch from './switch.vue'

export default {
  name: 'demo',
  data: () => ({
    swiVal: true
  }),
  components: {
    BaoSwitch
  }
}
</script>

<style lang="css" scoped>
</style>
