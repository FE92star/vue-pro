<template lang="html">
  <div class="">
    <bao-button type="primary">
      主要按钮
    </bao-button>
    <bao-button type="success" simple>
      朴素按钮
    </bao-button>
    <!-- 带有ICON的圆形按钮 -->
    <bao-button type="info" circle iconType="search">

    </bao-button>
    <!-- 文案和icon组合一起 -->
    <bao-button type="warning" iconType="edit">
      编辑
    </bao-button>
    <!-- 禁用按钮 -->
    <bao-button type="danger" disable>
      危险按钮
    </bao-button>
    <!-- 加载中状态 -->
    <bao-button type="primary" loading>
      加载中
    </bao-button>
    <!-- 尺寸 -->
    <bao-button size="small">
      小按钮
    </bao-button>
  </div>
</template>

<script>
import BaoButton from './button.vue'

export default {
  components: {
    BaoButton
  }
}
</script>

<style lang="css" scoped>
</style>
