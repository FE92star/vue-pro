<template lang="html">
  <bao-formpost :url="action" :params="param"></bao-formpost>
</template>

<script>
import BaoFormpost from './formPost.vue'

export default {
  name: 'demo',
  data() {
    return {
      action: 'a.php',
      param: [
        {'name': 'name', 'value': 'Bob'},
        {'name': 'password', 'value': '123'}
      ]
    }
  },
  components: {
    BaoFormpost
  }
}
</script>

<style lang="less" scoped>

</style>
