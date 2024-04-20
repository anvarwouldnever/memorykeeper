import express from "express";
import mongoose from "mongoose";
import router from "./router/index.js";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error-middleware.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config()
const port = process.env.PORT
const app = express();
const db = 'mongodb+srv://anvarpubg2004:anvarpubg2004@cluster0.ye0ytru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use('/api', router)
app.use(errorMiddleware)


async function start() {
    try {
        await mongoose.connect(db);
        app.listen(port, () => console.log("server is working on port" + port))
    } catch (error) {
        console.log(error)
    }
}

app.get('/', (req, res) => {
    res.status(200).json("respond")
})

start();