import dotenv from "dotenv";
import express from "express";
import ConnectDb from "./config/database.js";
import router from "./routes/auth.route.js";
dotenv.config();

const app = express();
ConnectDb();

app.use(express.json());
app.use("/auth", router);
app.get("/", (req, res) => {
    res.json("hero")
});
const port = 3000;
app.listen(port, () => {
    console.log("app listen on port 3000");
});