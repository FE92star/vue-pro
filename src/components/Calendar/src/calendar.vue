<template lang="html">
  <div class="">
    <section class="wh_container">
      <div class="wh_content_all">
        <div class="wh_top_changge" v-if="isShowControl">
          <li @click="PreMonth(myDate,false)">
            <div class="wh_jiantou1"></div>
          </li>
          <li class="wh_content_li">{{dateTop}}</li>
          <li @click="NextMonth(myDate,false)">
            <div class="wh_jiantou2"></div>
          </li>
        </div>
        <div class="wh_weekday">
          <div class="wh_weeks_item" v-for="(tag, index) in textTop" :key="index">
            <div class="wh_top_tag">
              {{tag}}
            </div>
          </div>
        </div>
        <div class="wh_content">
          <div class="wh_content_item" v-for="(item, index) in list" @click="clickDay(item, index)" :key="index">
            <div class="wh_item_date" v-bind:class="[{ wh_chose_day: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
              {{item.id}}
              <span v-if="item.isToday && showToday">今天</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import timeUtil from '@/common/js/date'

export default {
  name: 'calender',
  data: () => ({
    myDate: [],
    list: [],
    historyChose: [],
    dateTop: '',
    showToday: false,
    markDateList: []
  }),
  props: {
    markDate: { //用作日期的特殊标记-字符串数组
      type: Array,
      default: () => []
    },
    markDateMore: { //日期标记-对象数组
      type: Array,
      default: () => []
    },
    textTop: { //一周显示
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    },
    agoDayHide: { //最小时间
      type: String,
      default: `0`
    },
    futureDayHide: { //最大时间
      type: String,
      default: `2554387200`
    },
    isShowControl: { //是否显示左右月份切换控件
      type: Boolean,
      default: false
    },
    initDate: { //初始化当前显示月份
      type: String,
      default: '2019-01-01'
    },
  },
  methods: {
    setClass: function(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') { //用于切换上下个月
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getSideMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getSideMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k);
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k;
      })
      return [markDate, markDateMore];
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      let todayTime = '';
      let markDateList = [];
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        if (k.isToday) {
          todayTime = nowTime;
          this.$emit('isToday', nowTime);
        }
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || 'choose';
          }
          if(c.date == todayTime) { //标记日期包含今天
            this.showToday = true;
          }
          markDateList.push(c.date);
        }
        this.markDateList = markDateList;
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        // if (chooseDay && chooseDay === nowTime && flag) { //当前月份可选择的日期
        if (chooseDay && markDateList.indexOf(chooseDay) >= 0 && chooseDay === nowTime && flag) { //被标记的才可以被选中
          this.$emit('choseDay', nowTime, markDateList.indexOf(chooseDay));
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        }else if (this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag) { //历史上个月默认不选中
          k.chooseDay = false;
        }else if(chooseDay && markDateList.indexOf(chooseDay) == -1 && chooseDay === nowTime && flag){ //选中未被标记的日期
          this.$emit("chooseNo", nowTime);
          k.chooseDay = false;
        }
        if(nowTime == markDateList[0] && typeof(chooseDay) == 'undefined') { //初始化选中数组第一项
          k.chooseDay = true;
        }
      }
      this.list = arr;
    },
    refresh() { //用于更新展示日期状态
      this.myDate = new Date(this.initDate);
      this.getList(this.myDate);
    }
  },
  mounted() {
    this.myDate = new Date();
    this.getList(this.myDate);
  }
}
</script>

<style lang="less">
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
.backgroundT(@color1, @color2) { //左上到右下
  background: -webkit-linear-gradient(left top, @color1, @color2); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, @color1, @color2); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, @color1, @color2); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, @color1, @color2); /* 标准的语法 */
}
* {
  margin: 0;
  padding: 0;
}
.wh_container {
  width: 100%;
  margin: auto;
}
li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  .backgroundT(#8BBFFF, #6DA7F6);
}
.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}
.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}
.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3%;
  width: 100%;
  box-sizing: border-box;
}
.wh_weekday {
  display: flex;
  flex-wrap: wrap;
  width: 94%;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 1px solid #D8D8D8;
}
.wh_content_item, .wh_weeks_item {
  width: 14.28%;
  height: 42px;
  text-align: center;
  position: relative;
}
.wh_content_item {
  color: #B9B9B9;
  font-size: 15px;
}
.wh_weeks_item {
  color: #555;
  font-size: 12px;
}
.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    position: absolute;
    bottom: -13px;
    left: 0;
    color: #6D6D6D;
    display: inline-block;
    font-size: 20px;
    transform: scale(.5);
  }
}
.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}
.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}
.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: yellow;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: #4678E7;
  border-radius: 100px;
  color: #fff !important;
  &::before {
    content: "";
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 6px;
  }
  span {
    color: #fff !important;
  }
}
.choose {
  border: 1px solid #4678E7;
  border-radius: 40px;
  color: #555;
  position: relative;
  &::before {
    content: "";
    width: 4px;
    height: 4px;
    background: #4678E7;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 6px;
  }
}
</style>
