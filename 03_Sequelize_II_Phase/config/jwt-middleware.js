const JwtConfig = require("./jwt-config");
const JWT = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let userToken = req.headers["authorization"];

  if (userToken) {
    JWT.verify(
      userToken,
      JwtConfig.secret,
      {
        algorithm: JwtConfig.algorithm,
      },
      (error, data) => {
        if (error) {
          return res.status(500).json({
            status: 0,
            data: error,
            message: "Invalid Token",
          });
        } else {
          req.user = data;
          next();
        }
      }
    );
  } else {
    return res.status(500).json({
      status: 0,
      message: "Please provide authentication token value",
    });
  }
};

module.exports = {
    checkToken: checkToken
}