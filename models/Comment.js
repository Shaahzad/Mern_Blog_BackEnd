import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    desc: {type: String, required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true},
    check: {type: Boolean, default: false},
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    replyOnUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {timestamps: true, toJSON: {virtuals: true}})



CommentSchema.virtual("replies",{
    ref: "Comment",
    localField: "_id",
    foreignField: "parent"
})


export default mongoose.model("Comment", CommentSchema)