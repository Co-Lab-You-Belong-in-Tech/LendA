import express from "express"
import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js"
import { authJWT } from "../config/passport.js"

const router = express.Router()

router.get("/", getItems)
router.post("/", authJWT, createItem)

router.get("/:id", getItem)
router.put("/:id", authJWT, updateItem)
router.delete("/:id", authJWT, deleteItem)

export default router
