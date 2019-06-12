<template lang="html">
  <div class="">
    <bao-table
      :tHeader="['11', '222', '333']"
      :tLists="lists"
      :edit="true"
      @blur="blurTable"
      @focus="focusTable"
      >
    </bao-table>
  </div>
</template>

<script>
import BaoTable from './table.vue'

export default {
  name: 'demo',
  data: () => ({
    lists: [['aaa', 'bbb', 'ccc'], ['aaa', 'bbb', 'ccc']], // 二维数组格式
    index: 0,
    indexs: 0,
  }),
  components: {
    BaoTable
  },
  methods: {
    blurTable(text) {
      this.lists[this.index][this.indexs] = text
      console.log(this.lists); // 可获取编辑之后的数据
    },
    focusTable(index, indexs) {
      this.index = index
      this.indexs = indexs
    }
  }
}
</script>

<style lang="css" scoped>
</style>
