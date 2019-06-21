<template lang="html">
  <div class="">
    <bao-tab
      :tabList="['tab1', 'tab2', 'tab3']"
    >
      <div slot="tab_0">
        111111
      </div>
      <div slot="tab_1">
        222222
      </div>
      <div slot="tab_2">
        333333
      </div>
    </bao-tab>
  </div>
</template>

<script>
export default {
  name: 'demo',
  components: {
    BaoTab: () => import('./tab.vue')
  }
}
</script>

<style lang="less" scoped>
</style>
