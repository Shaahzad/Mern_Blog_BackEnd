import mongoose from "mongoose"

const Postcategoriesschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {timestamps: true}

)




export default mongoose.model("Postcategories", Postcategoriesschema)