export default {
  getDaysInOneMonth(date) { //获取某一月份对应的天数
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = new Date(year, month, 0);
    return d.getDate();
  },
  getMonthWeeks(date) { //获取某月份向前空几格,根据当月1号周几来判断
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateFirstOne = new Date(year + '/' + month + '/1');
    return dateFirstOne.getDay();
  },
  dateFormat(date) { //时间格式化
    date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  },
  getSideMonth(date, str = 'nextMonth') { //获取当前日期往前一个月或者之后的日期
    const timeArray = this.dateFormat(date).split('/');
    const year = timeArray[0];
    const month = timeArray[1];
    const day = timeArray[2];
    let year2 = year;
    let month2;
    if (str === 'nextMonth') {
      month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
    } else {
      month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
    }
    let day2 = day;
    const days2 = new Date(year2, month2, 0).getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    if (day2 < 10) {
      day2 = '0' + day2;
    }
    const t2 = year2 + '/' + month2 + '/' + day2;
    return new Date(t2);
  },
  // 上个月末尾的部分日期在当前月份的展示
  getLeftDaysArr(date) {
    const arr = [];
    const leftNum = this.getMonthWeeks(date);
    const num = this.getDaysInOneMonth(this.getSideMonth(date, 'preMonth')) - leftNum + 1;
    const preDate = this.getSideMonth(date, 'preMonth');
    // 上个月多少开始
    for (let i = 0; i < leftNum; i++) {
      const nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i);
      arr.push({
        id: num + i,
        date: nowTime,
        isToday: false,
        otherMonth: 'preMonth',
      });
    }
    return arr;
  },
  // 下个月开头的部分日期在当前月份的展示
  getRightDaysArr(date) {
    const arr = [];
    const nextDate = this.getSideMonth(date, 'nextMonth');
    const leftLength = this.getDaysInOneMonth(date) + this.getMonthWeeks(date);
    let _length = 7 - leftLength % 7;
    if(_length == 7) {
      _length = 0;
    }
    for (let i = 0; i < _length; i++) {
      const nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1);
      arr.push({
        id: i + 1,
        date: nowTime,
        isToday: false,
        otherMonth: 'nextMonth',
      });
    }
    return arr;
  },
  // 获取当前月份的本月日期列表
  getMonthListNoOther(date) {
    const arr = [];
    const num = this.getDaysInOneMonth(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const toDay = this.dateFormat(new Date());

    for (let i = 0; i < num; i++) {
      const nowTime = year + '/' + month + '/' + (i + 1);
      arr.push({
        id: i + 1,
        date: nowTime,
        isToday: toDay === nowTime,
        otherMonth: 'nowMonth',
      });
    }
    return arr;
  },
  // 获取当前月份的所有日期的列表
  getMonthList(date) {
    return [ ...this.getLeftDaysArr(date), ...this.getMonthListNoOther(date), ...this.getRightDaysArr(date) ];
  }
}
