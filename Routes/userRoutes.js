import express from "express"
const router = express.Router()
import { loginUser, registerUser, updateProfile, updateProfilePicture, userProfile } from "../Controllers/UserController.js"
import {AuthGuard} from "../Middleware/Authmiddleware.js"

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/Profile", AuthGuard, userProfile)
router.put("/updateProfile", AuthGuard, updateProfile)
router.put("/updateProfilePicture", AuthGuard, updateProfilePicture)


export default router