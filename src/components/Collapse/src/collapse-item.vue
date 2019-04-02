<template lang="html">
  <transition :name="name">
    <div class="collapse_item" v-show="showItem" :class="(showBorder ? 'underlineF' : '')" :style="(delayState ? delayStyle : {})">
      <div class="collapse_top" @click.prevent="openCollapse">
        <div class="left">
          {{title}}
        </div>
        <div class="right" v-if="showIcon">
          <slot name="icon">
            <img src="//r.51gjj.com/image/static/ico_list_next.png" alt="" :style="{transform: `rotate(${angle}deg)`}">
          </slot>
        </div>
      </div>
      <div class="collapse_bot" v-show="!expand">
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import mixin from '@/common/mixin/node'

export default {
  name: 'collapse-item',
  data: () => ({
    showItem: false,
    expand: true, //是否展开
    angle: 0, //icon旋转角度
  }),
  inject: ['accordion', 'name'], //接受父组件传递的信息
  mixins: [mixin],
  props: {
    title: [String, Number], //面板标题
    showIcon: {
      type: Boolean,
      default: true
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    delayState: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    delayTime() {
      let i = this.getIndex();
      let s = `${i / 10}s`;
      return s;
    },
    delayStyle() {
      let _this = this;
      let style = {
        transitionDelay: `${_this.delayTime}`
      }
      return style;
    }
  },
  methods: {
    openCollapse() {
      this.expand = !this.expand;
      this.angle = !this.expand ? 90 : 0;
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.showItem = true;
    }, 15)
  }
}
</script>

<style lang="less" scoped>
.flexBlock {
  display: flex;
  align-items: center;
  height: 100%;
}
.collapse_item {
  position: relative;
  width: 100%;
  overflow: hidden;
  .collapse_top {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 12px;
    overflow: hidden;
    position: relative;
    .left {
      .flexBlock;
      position: absolute;
      left: 12px;
      top: 0;
      font-size: 16px;
      color: #444;
    }
    .right {
      .flexBlock;
      position: absolute;
      right: 12px;
      top: 0;
      justify-content: flex-end;
      img {
        width: 15px;
        transition: all .5s;
      }
    }
  }
  .collapse_bot {
    background: #FAFAFA;
    padding: 12px;
    word-wrap: break-word;
    color: #666;
    font-size: 14px;
    line-height: 22px;
  }
}
.underlineF {
  position: relative;
  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    height: 1px;
    right: 0;
    transform: scaleY(1);
    transform-origin: 0 0;
    background: #ededed;
  }
}
</style>
