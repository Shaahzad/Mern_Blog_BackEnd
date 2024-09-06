import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js"
import cors from "cors"
import { ErrorResponseHandler, InvalidPathHandler } from "./Middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/api/users", userRoutes);
app.use(InvalidPathHandler);
app.use(ErrorResponseHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));