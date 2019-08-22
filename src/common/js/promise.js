/* es5实现promise */
function Promsie(excutor) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if(self.status == 'pending') {
      self.status = 'resolved'
      self.data = value
      for(var i=0; i<self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(reason) {
    if(self.status == 'pending') {
      self.status = 'rejected'
      self.data = reason
      for(var i=0; i<self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  try {
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
/* then方法最终返回的是一个新的promise，而不是this，因为promise的状态一旦确定下来就无法变更，返回this即为同一个promise多次调用就无效 */
Promsie.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }
  if(self.status == 'resolved') {
    return new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data)
        if(x instanceof Promise) {
          x.then(resolve, reject)
        }
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if(self.status == 'rejected') {
    return new Promsie(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        if(x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(x)
      }
    })
  }
  if(self.status == 'pending') {
    return new Promsie(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if(x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if(x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(x)
        }
      })
    })
  }
}
/*catch方法用于捕获错误*/
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

module.exports = Promsie
