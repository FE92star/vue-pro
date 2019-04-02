/**
* 在构造函数的原型上增加对应的方法
* 用于两个函数先后调用的处理
* @param {Function}
* @return {Object}
**/
Function.prototype.before = function(fn) {
  const _this = this
  return function() {
    fn.apply(this, arguments)
    return _this.apply(this, arguments)
  }
}
Function.prototype.after = function(fn) {
  const _this = this
  const currentFn = _this.apply(this, arguments)
  return function() {
    fn.apply(this, arguments)
    return currentFn
  }
}
/**
* 用于对嵌套数组做扁平化处理，变成只有一层，采取的是递归方式
* @return {Array} ——一维数组
**/
Array.prototype.flat = function() {
  let arr = []
  this.forEach((item, index) => {
    if(Array.isArray(item)) {
      arr = arr.concat(item.flat())
    }else {
      arr.push(item)
    }
  })
  return arr
}
