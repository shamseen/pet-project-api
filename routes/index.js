import { Router } from "express"
import userRoutes from "./user.js"
import preferenceRoutes from "./preference.js"

const router = Router()

router.get("/", (req, res) => res.send("<h1>This is the api root</h1>"))

router.use("/", userRoutes)
router.use("/", preferenceRoutes)

export default router