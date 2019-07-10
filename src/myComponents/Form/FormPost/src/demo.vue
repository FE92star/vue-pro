<template lang="html">

</template>

<script>

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
  methods: {
    postData() {
      this.$formpost.show({
        url: 'a.php',
        type: 'POST',
        params: [
          {name: 'name', value: 'Bob'}
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
