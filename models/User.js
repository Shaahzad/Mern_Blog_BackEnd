import mongoose from "mongoose"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationcode: {
        type: String,
        required: false
    },
    admin:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})


userSchema.methods.generateJWT = async function(){
    return await jwt.sign({id: this._id}, process.env.JWT_SECRET);
}

export default mongoose.model("User", userSchema)