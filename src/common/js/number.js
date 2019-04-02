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
* @param {Number} decimals
* @param {String} decial
* @param {String} separator
* @param {String} prefix
* @param {String} suffix
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
