import { Router } from "express"
import restrict from "../helpers/restrict.js"
import { signUp, signIn, verify} from "../controllers/UsersController.js"

const router = Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/verify", verify)
// router.get("/users", getUsers)
// router.get("/users/:id", getUser)
// router.put("/users/:id", restrict, updateUser)


export default router