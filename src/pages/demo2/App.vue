<template lang="html">
  <div class="">
    <bao-button type="primary" loading>
      加载中
    </bao-button>
    <bao-radio label="1" v-model="radio" @input="check">选项1</bao-radio>
    <bao-radio label="2" v-model="radio" @change="change">选项2</bao-radio>
    <div class="progress">
      <bao-progress :percentage='50' type="circle" background='#4679E7' textColor='#4678e7' circleText='立即投资' strokeWidth="80" strokeHeight="80" circleWidth="35"></bao-progress>
    </div>
    <!-- 条形进度条 -->
    <!-- <div class="line">
      <bao-progress :percentage="100" animationState background='#4679E7'></bao-progress>
    </div>
    <img src="../../assets/loading.gif" alt="">
    <bao-checkbox v-model="bool" shape="circle">选项djajdjajdja</bao-checkbox>
    <bao-switch v-model="swiVal" :disabled="false"></bao-switch>
    <bao-input placeholder="请输入金额" :maxlength="8" @input="focusFn" type="number" v-model="money"></bao-input>
    <bao-upload @change="changeFn" :userLimit="['png']" :drag="false" @unDrag="dragFn" multiple></bao-upload>
    <div class="" style="margin: 0 20px;">
      <bao-slider step="10" @change="sliderFn">
        <img src="//r.51gjj.com/image/static/icon-nstSlider-mark.png" alt="">
      </bao-slider>
    </div> -->
    <!-- <bao-card>
      <div class="" slot="top">
        title
      </div>
      <div class="" slot="bot">
        words
      </div>
    </bao-card>
    <bao-table
      :tHeader="['11', '222', '333']"
      :tLists="lists"
      :edit="true"
      @blur="blurTable"
      @focus="focusTable"
      >
    </bao-table>
    <bao-audio></bao-audio> -->
    <bao-pagination
      :range="10"
      :current="10"
      @preFn="fn1"
      @nextFn="fn2"
      @change="fn3"
      beforeTexts="上一页"
      afterTexts="下一页"
    >
    </bao-pagination>
    <!-- <div class="tab_wrap">
      <bao-tab
        :tabList="['tab1', 'tab2', 'tab3']"
        class="tabs"
      >
        <div slot="tab_0">
          111111
        </div>
        <div slot="tab_1">
          222222
        </div>
        <div slot="tab_2">
          333333
        </div>
      </bao-tab>
    </div> -->
    <bao-collapse accordion animateName="toastSlideUp">
      <bao-collapseItem :title="item.title" v-for="(item, index) in listData" :key="index" :topName="`${index}`">
        <!-- <img src="//r.51gjj.com/act/release/img/20180518_licai_fuli_icon.png" alt="" slot="icon"> -->
        <div class="" slot="content">
          {{item.desc}}
        </div>
      </bao-collapseItem>
    </bao-collapse>
  </div>
</template>

<script>
export default {
  data: () => ({
    radio: '1',
    bool: false,
    swiVal: true,
    money: 100000,
    lists: [['aaa', 'bbb', 'ccc'], ['aaa', 'bbb', 'ccc']],
    index: 0,
    indexs: 0,
    listData: [
      {
        title: '111',
        desc: 'aaa'
      },
      {
        title: '222',
        desc: 'bbb'
      },
      {
        title: '222',
        desc: 'bbb'
      },
      {
        title: '222',
        desc: 'bbb'
      },
    ],
  }),
  components: {

  },
  methods: {
    check(val) {
      console.log(val);
    },
    change(val) {
      console.log(val, this.radio);
    },
    changeFn(files) {
      // console.log(files);
    },
    dragFn(files) {
      console.log(files);
    },
    focusFn(val) {
      console.log(val);
    },
    sliderFn(val) {
      console.log(val);
    },
    blurTable(text) {
      this.lists[this.index][this.indexs] = text
      console.log(this.lists);
      // console.log(text);
    },
    focusTable(index, indexs) {
      this.index = index
      this.indexs = indexs
    },
    fn1(num, range) {
      console.log(num, range);
    },
    fn2(num, range) {
      console.log(num, range);
    },
    fn3(val, range) {
      console.log(val, range);
    },
  },
  mounted() {
    // this.$formpost.show({
    //   url: 'a.php',
    //   type: 'POST',
    //   params: [
    //     {name: 'name', value: 'Bob'}
    //   ]
    // })
    // this.$toast.show('')
    setTimeout(() => {
      // this.$toast.show({
      //   message: '数据请求失败',
      //   position: 'top',
      //   type: 'warning'
      // })
      this.$toast.show('cool')
    }, 5000)
    // this.$dialog.confirm({
    //   animate: 'bounce',
    //   title: '请先解锁',
    //   texts: `本章节内容还未解锁，请先解锁~`,
    //   btn: ['取消', '确定'],
    //   confirmFn: () => {
    //     this.$dialog.cancel()
    //     window.location.href = 'https://www.baidu.com'
    //   },
    //   cancleFn: () => {
    //     this.$dialog.cancel()
    //   }
    //   // checkFn: () => {
    //   //   this.$dialog.cancel()
    //   // }
    // })
    this.$load.show()
    setTimeout(() => {
      this.$load.hide()
    }, 500)
  }
}
</script>

<style lang="less" scoped>
@import url('../../common/css/reset.less');
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
.tab_wrap {
  width: 100%;
  /deep/ .tabs { // 用于修改子组件的默认样式并保持独立性，不会污染其他地方的样式
    color: #fff;
  }
}
</style>
