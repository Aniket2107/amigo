const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({});

const app = express();

//Db
const connect = require("./helpers/db");
connect();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/tweet", require("./routes/tweet"));
app.use("/api/conversations", require("./routes/conversation"));
app.use("/api/messages", require("./routes/messages"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  // console.log(users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  // console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user && user?.socketId) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    // console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
