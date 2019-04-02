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
