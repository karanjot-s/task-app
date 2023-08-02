const express = require("express");
const router = express.Router();

module.exports = router;

const { signin, signup, checkToken } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/check-token/:token", checkToken);
