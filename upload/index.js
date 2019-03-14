const upload = require('./upload.js')
const path = require('path')
const filePath = path.resolve(__dirname, '../dist/')
upload.init(function () {
  upload.start(filePath)
})
