import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
export const createComment = async (req, res, next) => {
try {
    const {desc,slug, parent, replyOnUser} = req.body


    const post = await Post.findOne({slug: slug})

    if(!post){
      const error = new Error("Post was not found")
      return next(error)  
    }


    const newComment = new Comment({
        user: req.user._id,
        desc,
        post: post._id,
        check: true,
        parent,
        replyOnUser
    })
    const savedComment = await newComment.save()
    return res.json(savedComment)
} catch (error) {
    next(error)
}
}