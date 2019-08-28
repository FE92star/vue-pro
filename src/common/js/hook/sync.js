/**
 * 同步基础类
 * @class BaseHook
 */
class BaseHook {
  constructor (args) {
    this.tasks = []
  }
  tap (name, task) {
    this.tasks.push(task)
  }
}

/**
 * 同步钩子
 * @class SyncHook
 * @extends {BaseHook}
 */
class SyncHook extends BaseHook {
  call (...args) {
    this.tasks.forEach(item => {
      item(...args)
    })
  }
}

/**
 * 同步保险钩子
 * 上一步返回undefined 才能执行下一步
 * @class SyncBailHook
 * @extends {BaseHook}
 */
class SyncBailHook extends BaseHook {
  call (...args) {
    let index = 0
    let ret
    do {
      ret = this.tasks[index](...args)
      index++
    } while (index < this.tasks.length && ret === undefined)
  }
}

/**
 * 同步流式钩子
 * 上一步结果为下一步参数
 * @class SyncWaterfallHook
 * @extends {BaseHook}
 */
class SyncWaterfallHook extends BaseHook {
  call (...args) {
    let [first, ...other] = this.tasks
    let ret = first(...args)
    other.reduce((a, b) => {
      b(a)
    }, ret)
  }
}

/**
 * 同步循环钩子
 * 某一步不返回 undefined 会循环执行
 * @class SyncLoopHook
 * @extends {BaseHook}
 */
class SyncLoopHook extends BaseHook {
  call (...args) {
    this.tasks.forEach(item => {
      let ret
      do {
        ret = item(...args)
      } while (ret === undefined)
    })
  }
}

export default {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
}
