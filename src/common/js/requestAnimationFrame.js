/**
 * requrestAnimateFrame 的兼容
 * 针对各个浏览器做增加前缀处理，如果不支持requrestAnimateFrame，则用setTimeout代替做处理
 */

 let lastTime = 0
 const prefixes = 'webkit moz ms o'.split(' ') // 各浏览器前缀

 let requestAnimationFrame
 let cancelAnimationFrame

 const isServer = typeof window === 'undefined'
 if (isServer) {
   requestAnimationFrame = function () {
     return true
   }
   cancelAnimationFrame = function () {
     return true
   }
 } else {
   requestAnimationFrame = window.requestAnimationFrame
   cancelAnimationFrame = window.cancelAnimationFrame
   let prefix
   // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
   for (let i = 0; i < prefixes.length; i++) {
     if (requestAnimationFrame && cancelAnimationFrame) {
       break
     }
     prefix = prefixes[i]
     requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame']
     cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']
   }

   // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
   if (!requestAnimationFrame || !cancelAnimationFrame) {
     requestAnimationFrame = function (a = function () {}) {
       const currTime = new Date().getTime()
       // 为了使setTimteout的尽可能的接近每秒60帧的效果
       const timeToCall = Math.max(0, 16 - (currTime - lastTime))
       const id = window.setTimeout(() => {
         a(currTime + timeToCall)
       }, timeToCall)
       lastTime = currTime + timeToCall
       return id
     }

     cancelAnimationFrame = function (id) {
       window.clearTimeout(id)
     }
   }
 }

 export {
   requestAnimationFrame,
   cancelAnimationFrame
 }
