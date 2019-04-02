<template lang="html">
  <div class="">
    <transition name="fade">
      <div class="alert_modal" v-if="showAlert"></div>
    </transition>
    <transition :name="animate">
      <div class="alert_wrap_box" v-show="showAlert" :style="{transitionDelay: '20ms'}">
        <div class="alert_top">
          <p>{{title}}</p>
          <div class="icon_close" @click.prevent="toggleFn">
            <img src="./assets/close.png" alt="">
          </div>
        </div>
        <div class="alert_bot">
          <div class="logo_left">
            <slot name="logo">
              <img src="./assets/logo2.png" alt="">
            </slot>
          </div>
          <ul class="text_right">
            <li v-for="(item, index) in textLists" :key="index">{{item}}</li>
          </ul>
          <div class="copy_btn" @click="copyFn">前往微信解锁内容</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pop-box',
  data: () => ({
    showAlert: false,
    title: '关注公众号“51商学院”解锁更多内容',
    textLists: [
      '1.微信打开“添加好友”',
      '2.在列表选择“添加公众号”',
      '3.粘贴内容搜索，关注公众号'
    ],
    animate: 'slide'
  }),
  methods: {
    toggleFn() {
      this.showAlert = false;
    },
    copyFn() {

    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
/* CSS引入需要绝对路径 */
@import url('../../common/css/transition.less');
.widthDis {
  width: 100%;
  display: block;
}
.alert_modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, .3);
}
.alert_wrap_box {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  background: #fff;
  width: 100%;
}
.alert_top {
  width: 100%;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  display: -webkit-flex;
          display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F5F5F5;
  p {
    font-size: 15px;
    color: #1D2027;
  }
  .icon_close {
    width: 18px;
    img {
      .widthDis;
    }
  }
}
.alert_bot {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 30px 30px 50px;
  position: relative;
  height: 192px;
  // overflow: hidden;
  .logo_left {
    position: absolute;
    left: 50px;
    top: 30px;
    width: 70px;
    height: 70px;
    img {
      .widthDis;
    }
  }
  .text_right {
    float: right;
    font-size: 14px;
    color: #666;
    li {
      line-height: 24px;
    }
  }
  .copy_btn {
    padding: 12px 29px;
    font-size: 12px;
    color: #fff;
    border-radius: 18px;
    background: #FF6B00;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
  }
}
@media screen and (max-width: 320px) {
  .alert_bot .logo_left {
    left: 15px;
  }
}
</style>
