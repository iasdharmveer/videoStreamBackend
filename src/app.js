import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({
    limit:"16kb"
}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));

// routes import
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter)
//url http://localhost:9000/api/v1/users/register

export { app };