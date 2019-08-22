/**
* 获取URL参数
**/
export const getUrlData = (href) => {
  let obj = {};
  let params = '';
  let hrefs = href || window.location.href;
  if(hrefs.match(/\?/g)) {
    if(hrefs.match(/\#/g)) {
      params = hrefs.split('?')[1];
      params = params.split('#')[0]
    }else {
      params = hrefs.split('?')[1];
    }
    if(params.match(/\=/g)) {
      if(params.match(/\&/g)) { //多个参数
        let paramL = params.split('&');
        for(let i of paramL) {
          let str = i;
          let o = str.split('=');
          let a = o[0];
          let b = o[1];
          obj[a] = b;
        }
      }else { //一个参数
        let o = params.split('=');
        let a = o[0];
        let b = o[1];
        obj[a] = b;
      }
    }
  }
  return obj;
}

/*
* 原生实现一个new操作符
*/
export const New = (func) => {
  var res = {} //构建一个新对象
  if(func.prototype !== null) {
    res.__proto__ = func.prototype //原型链继承
  }
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1)) //改变this指向
  if((typeof(ret) === "object" || typeof(ret) === "function") && ret !== null) { //如果是对象或function类型，即返回该对象
    return ret
  }
  return res
}

/*实现简单发布订阅者模式*/
export const Publish = () => {
  class PubSub {
    constructor() {
      this.list = {}
    }
    subscribe(key, fn) { //订阅
      if(!this.list[key]) {
        this.list[key] = []
      }
      this.list[key].push(fn)
    }
    publish() { //发布
      let arg = arguments
      let key = [].shift.call(arg)
      let fns = this.list[key]
      if(!fns || fns.length <= 0) return false
      for(let i=0, len=fns.length; i<len; i++) {
        fns[i].apply(this, arg)
      }
    }
    unSubscribe(key) {
      delete this.list[key]
    }
  }
  return new PubSub
}
// 组合函数——执行顺序是从后往前执行
export const compose = (...fns) => { //
  return function(x) {
    return fns.reduceRight(function(arg, fn) {
      return fn(arg)
    }, x)
  }
}
/**
* 管道函数——从前往后执行——前一个函数执行的结果是后一个函数执行的参数
@param {function} fns
**/
export const pipe = (...fns) => {
  return function(x) {
    return fns.reduce(function(arg, fn) {
      return fn(arg)
    }, x)
  }
}
// 字符串排列组合-用的是笛卡尔积算法
export function decarFn(nums) {
  return nums.reduce((a, b) => {
    let m = a.map(item => b.map(i => [i].concat(item)))
    return m.reduce((c, d) => c.concat(d), [])
  })
}
// 算法二
export function eachTwo(arr1, arr2){
  let arr = []
  for(let i = 0; i < arr1.length; i++) {
    for(let j= 0; j < arr2.length; j++) {
      if(arr1[i] instanceof Array) {
        arr.push([...arr1[i]].concat(arr2[j]))
      }else {
        arr.push(arr1[i].concat(arr2[j]))
      }
    }
  }
}

export function eachAll(a) {
  return a.reduce((a, b) => {
    return eachTwo(a, b)
  })
}
