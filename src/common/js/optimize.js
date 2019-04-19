/**
* 防抖函数：在事件被触发n秒后，再去执行回调函数。
* 如果n秒内该事件被重新触发，则重新计时。结果就是将频繁触发的事件合并为一次，且在最后执行
* 将多次触发事件合并一次，可能在延时时间内事件一次都不触发
* @param {Function} fn——执行函数
* @param {Number} delay——延时时间
* @param {Object} ctx——上下文对象
**/
export function debounceFn(fn, delay, ctx=this) {
  let timer = null
  return function(args) {
    const _this = ctx
    let _args = args
    if(timer != null) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, delay)
  }
}

/**
* 节流函数：规定一个时间n，n秒内，将触发的事件合并为一次并执行。延时时间内一定会触发一次
* @param {Function} fn
* @param {Number} delay
* @param {Object} ctx——上下文对象
**/
export function throttleFn(fn, delay, ctx=this) {
  return function() {
    if(fn.timer) return
    fn.timer = setTimeout(() => {
      fn.apply(ctx, arguments)
      clearTimeout(fn.timer)
      fn.timer = null
    }, delay)
  }
}
