<template>
  <transition :name="transitionFn" mode="out-in">
    <div class="toast_pane common_font typeStyle"
      v-if="showToast"
      :class="{
        topStyle: (position=='top'),
        middleStyle: (position=='middle'),
        bottomStyle: (position=='bottom'),
        headerTop: (position=='top' && isOrigin)
      }"
      :style="{color: color, background: background}">
      <img v-if="showIcon && type=='success'" class="icon_style" src="../assets/success.png" alt="">
      <img v-if="showIcon && type=='error'" class="icon_style" src="../assets/error.png" alt="">
      <img v-if="showIcon && type=='loading'" class="icon_style" src="../assets/loading_img.gif" alt="">
      <img v-if="showIcon && type=='wraning'" class="icon_style" src="../assets/wraning.png" alt="">
      {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  data: ()=> ({
    position: 'middle',
    animate: 'slideMiddle',
    showToast: false,
    message: '',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.6)',
    // w_icon: '//r.51gjj.com/act/release/img/wraning.png',
    // e_icon: '//r.51gjj.com/act/release/img/error.png',
    // s_icon: '//r.51gjj.com/act/release/img/success.png',
    // l_icon: '//r.51gjj.com/act/release/img/loading_img.gif',
    // img_icon: '',
    showIcon: false,
    type: "",
    toJSON: '', //用于解决编译过程中Vue的错误提示
    isOrigin: false
  }),
  props: {

  },
  computed: {
    transitionFn: function() {
      let position = this.position
      let type = this.type
      let ani = 'slideMiddle'
      if(position=='top'){
        ani = 'slidetop'
      }else if(position=='middle') {
        ani = 'slideMiddle'
      }else if(position=='bottom') {
        ani = 'slideBottom'
      }else {
        ani = 'slideMiddle'
      }
      if(type=='wraning') {
        this.showIcon = true
        // this.img_icon = this.w_icon
      }else if(type=='error') {
        this.showIcon = true
        // this.img_icon = this.e_icon
      }else if(type=='success'){
        this.showIcon = true
        // this.img_icon = this.s_icon
      }else if(type=='loading'){
        this.showIcon = true
        // this.img_icon = this.l_icon
      }else if(type=="") {
        this.showIcon = false
      }else {
        this.showIcon = false
      }
      return ani
    }
  },
}
</script>

<style scoped>
/*@import url("../animation/common.css");*/
.common_font {
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  z-index: 999;
  font-family: "微软雅黑";
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.icon_style {
  width: 24px;
  max-height: 26px;
  margin-right:10px;
}
.topStyle {
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 12px 0;
	background: rgba(250, 100, 100, .9);
	color: #fff;
	font-size: 14px;
  line-height: 14px;
	text-align: center;
	z-index: 9999;
}
.middleStyle {
  position: absolute;
  min-width: 30%;
  max-width: 70%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 3px;
  text-align: center;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottomStyle {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  min-height: 30px;
  padding: 5px 10px;
}
.typeStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}
.headerTop {
  padding-top: 30px;
}
.slideMiddle-enter-active, .slideMiddle-leave-active {
  transition: all 0.2s linear;
}
.slideMiddle-enter, .slideMiddle-leave-to {
  opacity: 0;
  /* top: 52%; */
}
.slideBottom-enter-active, .slideBottom-leave-active {
  transition: all 0.3s linear;
}
.slideBottom-enter, .slideBottom-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
.slidetop-enter-active, .slidetop-leave-active {
  transition: all .3s linear;
}
.slidetop-enter, .slidetop-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
</style>
