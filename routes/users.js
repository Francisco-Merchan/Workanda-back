const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { validateRequest } = require("../middlewares/validateRequest");
const { getUsers, updateUser, deleteUser } = require("../controllers/users");
const { createUser } = require("../controllers/auth");

const router = Router();

router.use(validateJWT);

router.get("/", getUsers);

router.post(
  "/",
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

router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio y debe tener al menos 3 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("email", "Ingrese un email valido").isEmail(),
    check("phone", "El numero de telefono debe ser valido").isMobilePhone(),
    validateRequest,
  ],
  updateUser
);

router.delete("/:id", deleteUser);

module.exports = router;
