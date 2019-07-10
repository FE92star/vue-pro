<template lang="html">
  <div class="">
    <bao-card>
      <div class="" slot="top">
        title
      </div>
      <div class="" slot="bot">
        words
      </div>
    </bao-card>
  </div>
</template>

<script>
import BaoCard from './card.vue'

export default {
  name: 'demo',
  components: {
    BaoCard
  }
}
</script>

<style lang="css" scoped>
</style>
