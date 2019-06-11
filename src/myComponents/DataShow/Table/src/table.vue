<template lang="html">
  <div class="table" v-if="legal">
    <table cellpadding="0" cellspacing="0">
      <!-- 表头 -->
      <tr v-if="tHeader">
        <th v-for="(hVal, index) in tHeader" :key="index">{{hVal}}</th>
      </tr>
      <!-- 表格内容 -->
      <tr v-if="tLists" v-for="(rVal, index) in tLists" :key="index">
        <td v-for="(dVal, indexs) in rVal" :key="indexs" :contenteditable="edit">{{dVal}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'bao-table',
  data() {
    return {
      legal: true
    }
  },
  props: {
    tHeader: {
      type: Array,
      default: () => {
        return []
      }
    },
    tLists: { // 二维数组
      type: Array,
      default: () => {
        return []
      }
    },
    edit: { // 是否为可编辑单元格
      type: Boolean,
      default: false
    }
  },
  created() {
    if(this.tLists.length && this.tLists[0]) {
      if(this.tLists[0].length !== this.tHeader.length) {
        this.legal = false // 不合法
        console.log(`请设置保持和表头同等长度的数据格式`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
table {
  width: 100%;
  min-width: 100%;
  font-size: 12px;
  color: #4A4A4A;
  text-align: center;
  tr {
    &:nth-last-of-type(1) {
      td {
        border-bottom: 1px solid #E5E9EF;
      }
    }
  }
  th, td {
    padding: 12px 13px 10px 15px;
    border: 1px solid #E5E9EF;
    border-left: 0;
    border-bottom: 0;
    background: rgba(229, 233, 239, .5);
    &:nth-of-type(1) {
      border-left: 1px solid #E5E9EF;
    }
  }
  td {
    background-color: #fff !important;
  }
}
</style>
