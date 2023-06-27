import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import { signupUser } from "./controller/user-controller.js";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", router);

// app.post("/signup", function(req,res){
//     signupUser(req,res);
// })
const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;

app.listen(8000,()=>{console.log("Server is running at 8000");})
Connection(USERNAME, PASSWORD);