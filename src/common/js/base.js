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
