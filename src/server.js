import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Server listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(3000, handleListen);

wss.on("connection", (socket)=>{
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from Browser ❌"));
    socket.on("message", (message)=> console.log(message.toString()));
    socket.send("hello");
});