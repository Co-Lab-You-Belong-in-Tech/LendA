import express from "express"
import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js"
import { authJWT } from "../config/passport.js"
import { paginate } from "../middlewares/pagination.js"
import Item from "../models/itemModel.js"

const router = express.Router()

router.get("/", paginate(Item), getItems)
router.post("/", authJWT, createItem)

router.get("/:id", getItem)
router.put("/:id", authJWT, updateItem)
router.delete("/:id", authJWT, deleteItem)

export default router
