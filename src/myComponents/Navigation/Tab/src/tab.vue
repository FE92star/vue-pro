<!-- tab组件 -->
<template lang="html">
  <div class="c--tab">
    <!-- tab_bar区域 -->
    <div class="tab--bar" :class='{shadow: showShadow}' :style='{height: `${barH}px`, background: tabBg }'>
      <!-- 返回按钮 -->
      <ul :style='{width: barWidth}'>
        <li v-for="(item, index) in tabList" :style="{width: 1/tabLength*100 + '%', fontSize: `${size}px` , color: activeIndex==index?actColor:fontColor }" @click.prevent="exchange(index)" :key="index">
          {{item}}
        </li>
        <div class="line" :style="{left: lineWidth(activeIndex), background: actColor}"></div>
      </ul>
    </div>
    <!-- 内容区域 -->
    <div class="tab--view">
      <ul class="tab_content" :style="tabW | moveTab(activeIndex, tabLength)">
        <li v-for="(item, index) in tabList" class="tab_item" :style='{width:tabW+"%",left:index*tabW+"%"}' :key="index">
          <slot :name="(`tab_${index}`)"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bao-tab',
  data: () => ({
    tabLength: 2, // tab长度
    activeIndex: 0,
    tabW: 1,
  }),
  props: {
    tabList: {
      type: Array,
      default: function() {
        return []
      }
    },
    tabBg: {
      type: String,
      default: '#fff'
    },
    fontColor: {
      type: String,
      default: '#333'
    },
    active: {
      type: [Number, String],
      default: 0
    },
    actColor: {
      type: String,
      default: '#4678e7'
    },
    barH: {
      type: [Number, String],
      default: 44
    },
    size: {
      type: [Number, String],
      default: 14
    },
    showShadow: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    moveTab(w, p, len) {
      var _t = -w * (p) + "%";
      return 'width:' + 100 * len + '%;-webkit-transform:translate(' + _t + ',0);transform:translate(' + _t + ',0);';
    }
  },
  computed: {
    barWidth: function() {
      let w = `${this.clientRect().w-40}px`
      if(this.tabList.length>4) {
        w = 80*(this.tabList.length)>this.clientRect().w-40 ?` ${80*(this.tabList.length)}px` : w
      }
      return w
    }
  },
  methods: {
    clientRect () {
      let posi = {
        w: 375,
        h: 603
      }
      if (window.innerWidth === undefined) {
        posi.w = document.documentElement.clientWidth
        posi.h = document.documentElement.clientHeight
      } else {
        posi.w = window.innerWidth
        posi.h = window.innerHeight
      }
      return posi
    },
    exchange(index) {
      this.activeIndex = index;
      this.$emit('change', index)
    },
    lineWidth(tab) {
      return (50 / this.tabLength + tab * 100 / this.tabLength) + '%';
    }
  },
  created() {
    this.tabLength = this.tabList.length;
    this.tabW = 100 / this.tabLength;
    this.activeIndex = this.active;
  }
}
</script>

<style scoped lang="less">
.c--tab {
  position: relative;
  width: 100%;
  height: 100%;
}
.shadow {
  box-shadow: 0 2px 4px #ddd;
}
.tab--bar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: #fff;
  overflow-x: auto;
  color: #303030;
  width: 100%;
  height: 44px;
  &::-webkit-scrollbar {
    display:none
  };
  ul {
    margin: 0 auto;
    padding-left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-x: scroll;
    position: relative;
    list-style: none;
    li {
      height: 100%;
      float: left;
      line-height: 44px;
      min-width: 80px;
      text-align: center;
      font-size: 14px;
    }
    .active {
      color: #4678e7;
    }
    .line {
      position: absolute;
      bottom: 2px;
      width: 65px;
      height: 2px;
      line-height: 4px;
      background-color: #4678e7;
      margin-left: -33px;
      transition: left 0.4s;
    }
  }
}
.tab--view {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 9;
  padding-top: 44px;
  .tab_content {
    position: relative;
    height: 100%;
    z-index: 2;
    transition: transform 0.4s;
    .tab_item {
      position: absolute;
      top: 0;
      height: 100%;
      display: block;
    }
  }
}
</style>
