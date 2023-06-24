const jwt = require("jsonwebtoken");

class Jwt {
  static GenerateAccessToken(payload, options = {}) {
    const { expiresIn = "1d" } = options;
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn });
  }

  static VerifyAccessToken(token, payload) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
  }
}

module.exports = Jwt;
