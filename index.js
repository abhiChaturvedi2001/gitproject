import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import githubRouter from "./routes/userRoute.js"
dotenv.config({});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/github", githubRouter);
const port = 4000;
app.listen(port, () => {
    console.log(port);
})