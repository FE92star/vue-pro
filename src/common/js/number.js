/**
* 判断是否是数字类型
* @param {Number} num
* @return {Boolean}
**/
export const isNumber = (num) => {
  return !isNaN(parseFloat(num))
}

/**
* 格式化数字
* @param {Number} num
* @param {Number} decimals -保留位数
* @param {String} decial -整数小数连接符
* @param {String} separator - 千分位分隔符
* @param {String} prefix - 首分隔符
* @param {String} suffix - 尾分隔符
* @return {String}
**/
export const formatNumber = (num, decimals=0, decimal='.', separator=',', prefix='', suffix='') => {
  num = num.toFixed(decimals).toString();
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  if(separator && !isNumber(separator)) {
    while (x1.match(rgx)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }
  return prefix + x1 + x2 + suffix;
}

/* 用类的方式重写 */
export function numberFormat() {
  class NumberFn {
    isNumber(num) {
      return !isNaN(parseFloat(num))
    }
    formate(num, decimals = 0, decimal = '.', separator = ',', prefix = '', suffix = '') {
      num = num.toFixed(decimals).toString();
      const x = num.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? decimal + x[1] : '';
      const rgx = /(\d+)(\d{3})/;
      if(separator && !this.isNumber(separator)) {
        while (x1.match(rgx)) {
          x1 = x1.replace(rgx, '$1' + separator + '$2');
        }
      }
      return prefix + x1 + x2 + suffix;
    }
  }
  // 子类的继承
  class NumFn extends NumberFn {

  }
  // console.log(Object.getPrototypeOf(NumFn) === NumberFn);
  let n = new NumFn()
  return n
}
