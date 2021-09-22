import { Router } from "express";
import restrict from "../helpers/restrict.js";
import { createPreference, getPreferences, getPreference } from "../controllers/PreferencesController.js";

const router = Router()

router.post("/preferences", createPreference)
router.get("/preferences", getPreferences)
router.get("/preferences/:id", getPreference)

export default router
