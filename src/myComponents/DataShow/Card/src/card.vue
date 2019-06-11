<template lang="html">
  <transition name="fade">
    <div class="card__content" :class='{"t-scale": activeObj}' v-show="isShow" @touchstart="startFn" @touchend="endFn">
      <div class="card_wrap">
        <div class="card_top">
          <slot name="top"></slot>
        </div>
        <div class="card_bot">
          <slot name="bot"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'bao-card',
  data: () => ({
    isShow: false,
    active: false
  }),
  props: {
    fix: { //是否是固定信息展示卡片，用于动态交互
      type: Boolean,
      default: true
    },
  },
  computed: {
    activeObj() {
      if(!this.fix && this.active) {
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    startFn() {
      this.active = true
    },
    endFn() {
      this.active = false
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.isShow = !this.isShow
    }, 50)
  }
}
</script>

<style lang="less" scoped>
.card__content {
  margin: 0 18px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 5px 20px 0 rgba(180, 180, 180, .4);
}
.card_wrap {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .card_top {
    padding: 9px 0 6px;
    font-size: 12px;
    line-height: 17px;
    height: 17px;
    color: #4A4A4A;
    border-bottom: 1px solid #F1F0F1;
  }
  .card_bot {
    height: 58px;
    display: -webkit-flex;
            display: flex;
    align-items: center;
    justify-content: center;
  }
}
.t-scale {
  transform: scale(.96);
  opacity: 0.98;
  transition: all 1.2s linear;
}
// animation
.fade-enter-active {
  transition: all .2s linear;
}
.fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
