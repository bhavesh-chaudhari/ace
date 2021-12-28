import express from "express"
import { getAllUsers, updateUser } from "../controllers/users.js"

const router = express.Router()

router.get("/", getAllUsers)
router.patch("/:id", updateUser)

export default router