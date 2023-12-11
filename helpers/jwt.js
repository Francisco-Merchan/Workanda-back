const jwt = require("jsonwebtoken");

const createJWT = (userId, name) => {
  return new Promise((resolve, reject) => {
    const payload = { userId, name };

    jwt.sign(
      payload,

      process.env.JWT_SECRET_WORD,

      {
        expiresIn: "2h",
      },

      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  createJWT,
};
