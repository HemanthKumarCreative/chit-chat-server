const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
require("dotenv").config();
const socketIo = require("socket.io");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/messages");
const groupRouter = require("./routes/groups");
const invitationRouter = require("./routes/invitations");
const userRouter = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const server = app.listen(process.env.PORT || 5000, async () => {
  console.log(
    `Server running on http://${process.env.DB_IP}:${process.env.PORT || 5000}`
  );
  try {
    await sequelize.sync(); // Sync the models with the database
  } catch (err) {
    console.log(err);
  }
});

const io = socketIo(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/users", userRouter);
