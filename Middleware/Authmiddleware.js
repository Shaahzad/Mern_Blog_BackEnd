import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const AuthGuard = async (req, res, next) => {
    console.log(req.headers)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select("-password");
            next();
            
        } catch (error) {
            const err = new Error("Not authorized, Token Failed");
            err.statusCode = 401;
            next(err);
        }
    }else{
        const err = new Error("Not authorized, No Token");
        err.statusCode = 401;
        next(err);
    }
        
}