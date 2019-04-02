<template lang="html">
  <div class="">
    <collapse accordion animationName="toastSlideUp">
      <collapse-item :title="item.title" v-for="(item, index) in listData" :key="index">
        <img src="//r.51gjj.com/act/release/img/20180518_licai_fuli_icon.png" alt="" slot="icon">
        <div class="" slot="content">
          {{item.desc}}
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import collapse from './collapse.vue'
import collapseItem from './collapse-item.vue'

export default {
  name: 'demo',
  data: () => ({
    listData: [
      {
        title: '111',
        desc: 'aaa'
      },
      {
        title: '222',
        desc: 'bbb'
      },
      {
        title: '222',
        desc: 'bbb'
      },
      {
        title: '222',
        desc: 'bbb'
      },
    ],
  }),
  components: {
    collapse,
    collapseItem
  },
}
</script>

<style lang="less">

</style>
