import express from "express"
const router = express.Router()
import {  } from "../Controllers/CommentController.js"
import {AuthGuard, adminGuard} from "../Middleware/Authmiddleware.js"

router.post("/", AuthGuard, adminGuard, createPost)


export default router