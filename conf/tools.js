/**
 * 修饰符
 * 控制命令行为
 * @export
 * @param {*} s=>string => @none[pro]
 * @returns obj
 */
const decoFn = (s) => {
  if (s.match(/@.*\[.*\]/g)) {
    let a = s.split('[')
    let a0 = a[0]
    let a1 = a[1]
    let b0 = a0.substr(1).split('@') // 修饰符集合
    let b1 = a1.substr(0, a1.length - 1)
    let c = b1.split(',')
    let c1 = c.map(item => {
      return item.trim()
    })
    return {
      header: b0,
      body: c1
    }
  } else {
    return {
      header: ['default'],
      body: [s]
    }
  }
}

/**
 * 查找是否包含某个元素
 * arr为数组时 检测是否包含  arr为字符串时检测是否相等
 * @param {*} arr
 * @param {*} ik
 * @returns true || false
 */
const some = (arr, ik) => {
  if (typeof (arr) === 'string') {
    return arr === ik
  }
  return arr.some(item => {
    return item === ik
  })
}
const find = (arr, reg) => {
  if (typeof (arr) === 'string') {
    return arr.match(reg) ? arr : null
  }
  return arr.find(item => {
    return item.match(reg)
  })
}

module.exports = {
  decorator: decoFn,
  some: some,
  find: find
}
