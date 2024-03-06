require('dotenv').config()
module.exports = {
  secret: "sequelizekey",
  expiresIn: 120, // 120 seconds or 2 mins
  notBefore: 2, // for 2 seconds, Bydefault, notBefore & expiresIn is in seconds & not in milliseconds
  audience: "site-users",
  issuer: "km",
  algorithm: "HS384",
};
