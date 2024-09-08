import express from "express"
const router = express.Router()
import { createPost, deletePost, getPost, updatePost } from "../Controllers/PostController.js"
import {AuthGuard, adminGuard} from "../Middleware/Authmiddleware.js"

router.post("/", AuthGuard, adminGuard, createPost)
router.route("/:slug").put(AuthGuard, adminGuard, updatePost)
.delete(AuthGuard, adminGuard, deletePost)
.get(getPost)


export default router