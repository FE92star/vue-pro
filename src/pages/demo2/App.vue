<template lang="html">
  <div class="">
    <bao-button type="primary" loading>
      加载中
    </bao-button>
    <bao-radio label="1" v-model="radio" @input="check">选项11111</bao-radio>
    <bao-radio label="2" v-model="radio" @change="change">选项2</bao-radio>
    <div class="progress">
      <bao-progress :percentage='50' type="circle" background='#4679E7' textColor='#4678e7' circleText='立即投资' strokeWidth="80" strokeHeight="80" circleWidth="35"></bao-progress>
    </div>
    <!-- 条形进度条 -->
    <div class="line">
      <bao-progress :percentage="100" :animationState="true" background='#4679E7'></bao-progress>
    </div>
    <img src="../../assets/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  data: () => ({
    radio: '1'
  }),
  methods: {
    check(val) {
      console.log(val);
    },
    change(val) {
      console.log(val, this.radio);
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.iconfont {
	font-size: 14px;
	color: #fff;
}
.progress {
  width: 80px;
}
.line {
  width: 100%;
  height: 12px;
}
</style>
