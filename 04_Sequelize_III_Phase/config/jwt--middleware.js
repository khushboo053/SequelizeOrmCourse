const JWT = require("jsonwebtoken");
const JwtConfig = require("./jwt-config");

const validateToken = (req, res, next) => {
  let tokenValue = req.headers["authorization"];

  if (tokenValue) {
    JWT.verify(tokenValue, JwtConfig.secret, (error, data) => {
      if (error) {
        return res.status(500).json({
          status: 0,
          message: "Invalid Token Found " + error,
        });
      } else {
        req.data = data;

        next();
      }
    });
  } else {
    return res.status(404).json({
      status: 0,
      message: "Token needed",
    });
  }
};

module.exports = {
  checkToken: validateToken,
};
