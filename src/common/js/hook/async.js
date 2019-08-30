/**
 * 异步基础类
 * @class BaseAsyncHook
 */
class BaseAsyncHook {
  constructor (args) {
    this.tasks = []
  }
  tapAsync (name, task) {
    this.tasks.push(task)
  }
  tap () {
    console.warn('请使用 tapAsync 方法')
  }
  call () {
    console.warn('请使用 callAsync 方法')
  }
}

/**
 * 并行异步钩子
 * @class AsyncParallerHook
 * @extends {BaseAsyncHook}
 */
class AsyncParallerHook extends BaseAsyncHook {
  promise (...args) {
    let list = this.tasks.map(item => {
      return item(...args)
    })
    return Promise.all(list)
  }
  callAsync (...args) {
    let index = 0
    let finalCallback = args.pop()
    let done = () => {
      index++
      if (index === this.tasks.length) return finalCallback()
    }
    this.tasks.forEach(item => {
      item(...args, done)
    })
  }
}

/**
 * 串行异步钩子
 * @class AsyncSeriesHook
 * @extends {BaseAsyncHook}
 */
class AsyncSeriesHook extends BaseAsyncHook {
  promise (...args) {
    let [first, ...other] = this.tasks
    let ret = first(...args)
    other.reduce((a, b) => {
      a.then(() => b(...args))
    }, ret)
  }
  callAsync (...args) {
    let index = 0
    let finalCallback = args.pop()
    let next = () => {
      if (index === this.tasks.length) return finalCallback()
      let task = this.tasks[index++]
      task(...args, next)
    }
    next()
  }
}

/**
 * 串行异步保险钩子
 * 上一步异步执行返回 undefined 才能执行下一步
 * @class AsyncBailHook
 * @extends {BaseAsyncHook}
 */
class AsyncBailHook extends BaseAsyncHook {
  promise (...args) {
    let [first, ...other] = this.tasks
    let ret = first(...args)
    other.reduce((a, b) => {
      a.then((params) => {
        if (params === undefined) {
          return b(...args)
        } else {
          console.log(params)
        }
      })
    }, ret)
  }
  callAsync (...args) {
    let index = 0
    let finalCallback = args.pop()
    let done = (params) => {
      index++
      if (index === this.tasks.length) return finalCallback()
      if (params === undefined) {
        this.tasks[index](...args, done)
      } else {
        console.log(params)
      }
    }
    done()
  }
}

/**
 * 流式异步钩子 上一步结果为下一步参数
 * @class AsyncWaterfallHook
 * @extends {BaseAsyncHook}
 */
class AsyncWaterfallHook extends BaseAsyncHook {
  promise (...args) {
    let [first, ...other] = this.tasks
    let ret = first(...args)
    other.reduce((a, b) => {
      a.then((_err, data) => b(data))
    }, ret)
  }
  callAsync (...args) {
    let finalCallback = args.pop()
    let index = 0
    let next = (_err, data) => {
      let task = this.tasks[index]
      if (index === this.tasks.length) return finalCallback(data)
      if (index === 0) {
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}

export default {
  AsyncParallerHook,
  AsyncSeriesHook,
  AsyncBailHook,
  AsyncWaterfallHook
}
