const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = 3000;
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("coordinates", (data) => {
    console.log(data);

    socket.broadcast.emit("usercoordinates", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});
app.use(cors());
server.listen(port, "0.0.0.0", () => {
  console.log(`listening on port ${port}`);
});
