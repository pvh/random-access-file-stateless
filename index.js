var randomAccess = require("random-access-storage");
var randomAccessFile = require("random-access-file");

var rafMap = {};
var rafBuf = [];

function filePool(name) {

  return randomAccess({
    open: function(req) {
      var raf = randomAccessFile(name);
      rafMap[req.filename] = raf;
      rafBuf.push(raf);

      raf.open(req)
    },
    read: function(req) {
      return rafMap[req.filename].read(req);
    },

    write: function(req) {
      return rafMap[req.filename].write(req);
    },

    del: function(req) {
      return rafMap[req.filename].del(req);
    },

    close: function(req) {
      if (!fd) return req.callback(null);
      fs.close(fd, err => req.callback(err));
      delete rafMap[req.filename];
      rafBuf = rafBuf.filter(f => f === raf);
    }
  });
};

module.exports = filePool