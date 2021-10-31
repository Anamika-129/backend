const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

const port = process.env.PORT || 5000;
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter");

const cors = require("cors");

app.use(cors({ origin: ["https://chatapp-frontend8.herokuapp.com/chat","http://localhost:3000"]}));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
});

app.use(express.static("./uploads"));

app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  console.log("request from client!!");
  res.send("Server Online !");
});

httpServer.listen(port, () => {
  // console.log('server started on port ' + port);
  console.log(`server started on port ${port}`);
});