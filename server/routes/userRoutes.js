import express from "express"

import {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)

router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router
