import express from "express";
import { getAllEvents, createEvent, getEvent, updateEvent, deleteEvent } from "../controllers/events.js";

const router = express.Router()

router.get("/", getAllEvents)
router.post("/", createEvent)
router.get("/:id", getEvent)
router.patch("/:id", updateEvent)
router.delete("/:id", deleteEvent)

export default router