import express from "express";
import { chats } from "./data/data.js";

const app = express();

app.get('/', (req, res) => {
    res.send("Api is running");
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})
app.listen(5000, console.log("Started server on port 5000"));

