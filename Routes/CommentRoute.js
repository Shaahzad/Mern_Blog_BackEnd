import express from "express"
const router = express.Router()
import { createComment } from "../Controllers/CommentController.js"
import {AuthGuard} from "../Middleware/Authmiddleware.js"

router.post("/", AuthGuard, createComment)


export default router