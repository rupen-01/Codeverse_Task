const router = require("express").Router();
const {register, login } = require("../constrollers/userController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
