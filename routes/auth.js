const { Router } = require("express");
const { check } = require("express-validator");
const { validateRequest } = require("../middlewares/validateRequest");
const { validateJWT } = require("../middlewares/validateJWT");
const { createUser, loginUser, renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/new",

  [
    check("name", "El nombre es obligatorio y debe tener al menos 3 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "La contraseña debe tener 6 caracteres").isLength({
      min: 6,
    }),
    check("phone", "El numero de telefono debe ser valido").isMobilePhone(),
    validateRequest,
  ],

  createUser
);

router.post(
  "/",

  [
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "La contraseña debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validateRequest,
  ],

  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
