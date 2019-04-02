<template lang="html">
  <div class="">
    <transition name="fade">
      <div class="dialog__modal" v-if="showDialog"></div>
    </transition>
    <transition :name="animate">
      <div class="dialog__wrap" v-show="showDialog">
        <div class="dialog_contens">
          <div class="dialog_top">
            <h4>{{title}}</h4>
            <p>{{texts}}</p>
          </div>
          <div class="dialog_bot" @click="checkFn">
            {{btn}}
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
    title: '解锁成功',
    texts: '恭喜您成功解锁【第x章】内容~',
    btn: '前往查看'
  }),
  methods: {
    checkFn() {
      console.log('checkFn');
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@import url('../../common/transition.less');
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
      padding-top: 32px;
      margin-bottom: 18px;
    }
    p {
      font-size: 14px;
      color: #9A9A9A;
      padding-bottom: 31px;
    }
    .dialog_bot {
      font-size: 17px;
      color: #FF6B00;
      padding: 14px 0;
    }
  }
}
</style>
