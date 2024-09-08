import express from "express"
const router = express.Router()
import { createPost, updatePost } from "../Controllers/PostController.js"
import {AuthGuard, adminGuard} from "../Middleware/Authmiddleware.js"

router.post("/", AuthGuard, adminGuard, createPost)
router.put("/:slug", AuthGuard, adminGuard, updatePost)



export default router