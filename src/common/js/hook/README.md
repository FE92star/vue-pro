### hook钩子函数
****
> 参考webpack中plugins的tabable的钩子函数集合

### sync 同步钩子
* SyncHook
* SyncBailHook
* SyncWaterfallHook
* SyncLoopHook

#### 【SyncHook】
> 基础同步钩子
```js
let hook = new SyncHook()
hook.tap('vue', (a)=> {
  console.log('vue', a)
})
hook.tap('react', (a)=> {
  console.log('react', a)
})
hook.call('前端框架')
```

#### 【SyncBailHook】
> 保险钩子  上一步return 不会执行到下一步

#### 【SyncWaterfallHook】
> 流式钩子  上一步返回为下一步参数

#### 【SyncLoopHook】
> 循环钩子   某一个函数可以执行多次


****

### async 异步钩子
* AsyncParallerHook
* AsyncSeriesHook
* AsyncBailHook
* AsyncWaterfallHook

#### 【AsyncParallerHook】
> 异步并行钩子

```js
// 方式一
hook.tapAsync('vue', (a, cb)=> {
  setTimeout(()=> {
    console.log('vue', a)
    cb()
  }, 1000)
})
hook.tapAsync('react', (a, cb)=> {
  setTimeout(()=> {
    console.log('react', a)
    cb()
  }, 1000)
})
hook.callAsync('前端框架', ()=> {
  console.log('end')
})

// 方式二
hook.tapAsync('vue', (a)=> {
  return new Promise((res, rej)=> {
    setTimeout(()=> {
      console.log('vue', a)
      res()
    }, 1000)
  })
})
hook.promise('结束').then(()=> {
  console.log('end')
})
```

#### 【AsyncSeriesHook】
> 异步串行钩子  上一步后执行下一步

#### 【AsyncBailHook】
> 异步保险钩子 串行 上一步阻断  不会执行下一步

#### 【AsyncWaterfallHook】
> 异步流式钩子  上一步执行结果传递给下一步
