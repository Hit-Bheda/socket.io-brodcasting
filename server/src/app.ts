import express  from "express";
import morgan from "morgan";
import { morganData, morganFormate } from "./logger/morgan";
import cors from "cors";

const app = express();

app.use(morgan(morganFormate,morganData))
app.use(cors({
    origin: "*",
}))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app