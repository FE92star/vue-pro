<template lang="html">
  <div class="">
    <transition name="fade">
      <div class="dialog__modal" v-if="showDialog"></div>
    </transition>
    <transition :name="animate">
      <div class="dialog__wrap" v-show="showDialog" :style="{transitionDelay: '50ms'}">
        <div class="dialog_contens">
          <div class="dialog_top">
            <h4>{{title}}</h4>
            <div class="text" v-html="texts"></div>
          </div>
          <div class="dialog_bot" v-if="btnFn">
            <p v-for="(item, index) in btn" :key="index" :class="{ 'lastBtn': showBtnLine(index)}" @click="checkFn(item, index)">{{item}}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'dialog-box',
  data: () => ({
    animate: 'bounce',
    showDialog: false,
    title: '对话框',
    texts: '恭喜您成功打开一个对话框',
    btn: [],
    showBtn: false,
  }),
  computed: {
    btnFn() {
      if(this.btn.length > 0) {
        this.showBtn = true
      }else {
        this.showBtn = false
      }
      return this.showBtn
    }
  },
  methods: {
    checkFn(item, index) {
      if(item.match(/(cancle|取消|关闭|放弃)/g)) {
        this.cancleFn()
      }else {
        if(item.match(/(confirm|确定|提交|确认)/g)) {
          this.confirmFn()
          return
        }else if(index===0 && this.btn.length>1) {
          this.cancleFn()
          return
        }else{
          this.confirmFn()
          return
        }
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    },
    showBtnLine(index) {
      let l = this.btn.length
      let b = true
      if(index+1>=l) {
        b = false
      }
      return b
    },
    cancleFn() {
      console.log('cancel');
    },
    confirmFn() {
      console.log('confirm');
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
// @import url('../../../common/transition.less');
.dialog__modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.dialog__wrap {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: transparent;
  display: -webkit-flex;
          display: flex;
  justify-content: center;
  align-items: center;
  .dialog_contens {
    width: 73.3%;
    // height: 159px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    .dialog_top {
      border-bottom: 1px solid #EEEEEE;
      overflow: hidden;
    }
    h4 {
      font-size: 17px;
      color: #333333;
      font-weight: bold;
      // padding-top: 32px;
      margin: 18px 0;
    }
    .text {
      font-size: 14px;
      color: #9A9A9A;
      padding-bottom: 31px;
    }
    .dialog_bot {
      width: 100%;
      height: 40px;
      font-size: 16px;
      color: #FF6B00;
      display: -webkit-flex;
              display: flex;
      align-items: center;
      &:before {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 1px;
        background: #ddd;
        content: "";
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
      p {
        flex-grow: 1;
        flex-shrink: 0;
        font-size: 15px;
        text-align: center;
        color: rgb(43, 112, 245);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .lastBtn {
        position: relative;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: #ddd;
          transform: scaleX(0.5);
          transform-origin: 0 0;
          content: ""
        }
      }
    }
  }
}
/*淡入淡出*/
.fade-enter-active {
  transition: all .2s linear;
}
.fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/*bounce*/
.bounce-enter-active, .bounce-leave-active {
  transition: all 0.3s linear;
}
.bounce-enter, .bounce-leave-to {
  transform: scale(1.5);
  opacity: 0;
}
</style>
