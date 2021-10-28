const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

const port = 5000;
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter");

const cors = require("cors");

app.use(cors({ origin: ["http://localhost:3000"] }));
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
  res.send("you got a response");
});

app.get("/add", (req, res) => {
  console.log("request from client on add!!");
  res.send("you got a response from add at root");
});

app.get("/home", (req, res) => {
  console.log("request from client at home!!");
  // res.send('you got a response from home');
  res.json({ message: "Success" });
});

httpServer.listen(port, () => {
  // console.log('server started on port ' + port);
  console.log(`server started on port ${port}`);
});