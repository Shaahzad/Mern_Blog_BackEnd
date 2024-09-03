import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            // return res.status(400).json({ message: "User already exists" });
            throw new Error("User already exists");
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //Create new user
         user = await User.create({
             name,
             email,
             password: hashedPassword,
         })

         //Generate token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {})


         return res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            admin: user.admin,
            token: token,
          });
    } catch (error) {
        next(error)
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user){
            throw new Error("User doesn't exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Incorrect password")
        }

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
            admin: user.admin,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {}),
        })


    } catch (error) {
        next(error)
    }
}

