const fs = require("fs");
const jwt = require("jsonwebtoken");

function logReqRes(filename) {
  return (req, res, next) => {
    let log = `\n${Date.now()} : ${req.method} : ${req.path}`;
    fs.appendFile(filename, log, (err, data) => {
      next();
    });
  };
}

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySeCretKey", (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!!");
  }
};

module.exports = {
  logReqRes,
  verify,
};
