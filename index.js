import express from "express";
const app = express();

app.get("/", (req,res)=>{
    res.json("hero")
});
const port = 3000;
app.listen(port, ()=>{
    console.log("app listen on port 3000");
});