/* 用于判断当前传入的名称对应的节点是否存在并返回该节点
* @method checkNode
* @param{ String } el 需要查找的节点的标签名、类名或ID名
* @return{ Element }
**/

export function checkNode(el) {
  let result = el
  if(!el) {
    return console.error('请传入对应的DOM参数')
  }
  if(typeof result === 'string') { // 传入的是对应的DOM类名
    result = document.querySelector(result)
    // 未找到对应的DOM
    if(Object.prototype.toString.call(result) === "[object Null]") {
      return console.error('未找到对应的DOM元素')
    }
  }else if(typeof result === 'object') { // 传入的参数是对象
    if(!result.nodeName) {
      return console.error('未找到对应的DOM元素')
    }
  }
  return result
}