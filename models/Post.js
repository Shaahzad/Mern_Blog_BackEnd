import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Caption: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: Object,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags:{
        type: [String],
    },
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: "Postcategories"}],
}, {timestamps: true})



PostSchema.virtual("Comment",{
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
})



export default mongoose.model("Post", PostSchema)