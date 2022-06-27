import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();


const app = express();

app.get('/', (req, res) => {
    res.send("Api is running");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Started server on port ${PORT}`));

