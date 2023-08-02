const express = require("express");
const router = express.Router();

module.exports = router;

const {
  create,
  getAll,
  getOne,
  deletePrd,
  toggleTask,
} = require("../controllers/task");
const { authenticateToken } = require("../utils/auth");

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getOne);
router.post("/", authenticateToken, create);
router.delete("/:id", authenticateToken, deletePrd);
router.put("/:id", authenticateToken, toggleTask);
