
const ras = require('random-access-storage')
const raf = require('random-access-file')

var rafMap = {};

const wrapper = function (name, opts) {
  return ras({
    read: (req) => fwd(0, req),
    write: (req) => fwd(1, req),
    del: (req) => fwd(2, req),
    stat: (req) => fwd(3, req),
  })

  function fwd (type, req) {
    var file = raf(name, opts)
    const innerCb = req.callback.bind(req)

    const cb = (...args) => { 
        file.close(() => {innerCb(...args)})
    }

    switch (type) {
      case 0: return file.read(req.offset, req.size, cb)
      case 1: return file.write(req.offset, req.data, cb)
      case 2: return file.del(req.offset, req.size, cb)
      case 3: return file.stat(cb)
    }
  }
}

module.exports = wrapper
