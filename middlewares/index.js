const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    let log = `\n${Date.now()} : ${req.method} : ${req.path}`;
    fs.appendFile(filename, log, (err, data) => {
      next();
    });
  };
}

module.exports = {
  logReqRes,
};
