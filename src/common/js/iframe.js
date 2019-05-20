// 用于判断h5是否成功调起客户端APP应用的模拟方法
/**
* @param {客户端提供的schema链接} url
* @param {Function} onSuccess
* @param {Function} onFail
**/
export default function iframeFn(url, onSuccess = () => {}, onFail = () => {}) {
  let lastTime = Date.now() || new Date().getTime() //记录初始时间
  // 页面创建iframe并为其添加样式
  let ifr = document.createElement('iframe')
  ifr.src = url
  const styleTexts = 'position: absolute;left: -99999px;top: -99999px;width: 1px;height: 1px;-webkit-transiton: all 4s;transiton: all 4s;'
  ifr.style.cssText = styleTexts //避免多次改变属性导致页面多次发生回流重绘
  document.body.appendChild(ifr)
  // 监听iframe的动画时间
  setTimeout(() => { //异步事件保证iframe已经加载完成
    ifr.addEventListener('webkitAnimationEnd', function() {
      document.body.removeChild(ifr) //动画结束移除iframe对象
      let nowTime = Date.now() //获取动画结束时间并与初始时间比较
      if(nowTime - lastTime > 6000) { //执行时间超过预期时间6s表示成功调起
        if(Object.prototype.toString.call(onSuccess) === '[object Function]') {
          onSuccess()
        }
      }else { //调用失败
        if(typeof(onFail) === 'function') {
          onFail()
        }
      }
    }, false)
    ifr.style.left = '0px'
  }, 0)
}
