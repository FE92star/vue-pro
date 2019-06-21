<template lang="html">
  <div class="pagination_wrap">
    <span class="before page_item" :class="{'disable': num == 1}" v-html="beforeTexts" @click="preFn"></span>
    <ul>
      <li class="page_item" @click="change(1)" :class="{'active_item': num == 1}">
        1
      </li>
      <li class="page_item" v-if="num - 1 > 2">
        ...
      </li>
      <li class="page_item" v-if="num - 1 > 1" @click="change(num - 1)">
        {{num - 1}}
      </li>
      <li class="page_item active_item" v-if="num > 1 && num < range" @click="change(num)">
        {{num}}
      </li>
      <li class="page_item" v-if="num + 1 < range" @click="change(num + 1)">
        {{num + 1}}
      </li>
      <li class="page_item" v-if="num + 2 < range">
        ...
      </li>
      <li class="page_item" v-if="range > 1" @click="change(range)" :class="{'active_item': num == range}">
        {{range}}
      </li>
    </ul>
    <span class="after page_item" :class="{'disable': num >= range}" v-html="afterTexts" @click="nextFn"></span>
  </div>
</template>

<script>
export default {
  name: 'bao-pagination',
  data: () => ({
    beforeTexts: '<',
    afterTexts: '>',
    num: 0
  }),
  props: {
    current: {
      type: Number,
      default: 1
    },
    range: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.num = this.current
  },
  methods: {
    preFn() {
      if(this.num > 1) {
        --this.num
        this.$emit("preFn", this.num, this.range)
      }
    },
    change(val) {
      this.num = val
      this.$emit("change", val, this.range)
    },
    nextFn() {
      if(this.num < this.range) {
        ++this.num
        this.$emit("nextFn", this.num, this.range)
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.pagination_wrap {
  white-space: nowrap;
  position: relative;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  display: -webkit-flex;
  align-items: center;
  .page_item {
    display: inline-block;
    margin: 0 5px;
    background-color: #f4f4f5;
    min-width: 30px;
    border-radius: 2px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    vertical-align: top;
  }
}
.active_item {
  background-color: #409eff !important;
  color: #fff;
}
.disable {
  cursor: not-allowed !important;
	background-image: none !important;
}
</style>
