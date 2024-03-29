var test = require("random-access-test")
var os = require("os")

const randomAccess = require('.')

var path = require("path")

var tmp = path.join(
  os.tmpdir(),
  "random-access-file-" + process.pid + "-" + Date.now()
)
test(
  function(name, options, callback) {
    const file = path.join(tmp, name)
    callback(randomAccess(file, options))
  },
  {
    // Choose which test to exercise
    reopen: true, // tests that re-open same file (not applicable to ram)
    content: false, // tests that populates with options.content
    del: true, // tests that excersise advisory del API
    writable: true, // tests that excersise open with `options.writable`
    size: true, // tests that excersise open with `options.size`
    truncate: true // tests that excersise open with `options.truncate`
  }
)
