import express from "express"
const router = express.Router()
import { createPost, deletePost, getAllpost, getPost, updatePost } from "../Controllers/PostController.js"
import {AuthGuard, adminGuard} from "../Middleware/Authmiddleware.js"


router.post("/", AuthGuard, adminGuard, createPost)
router.put("/:slug", AuthGuard, adminGuard, updatePost)
router.delete("/:slug", AuthGuard, adminGuard, deletePost)
router.get("/:slug", getPost)
router.get("/", getAllpost)
export default router