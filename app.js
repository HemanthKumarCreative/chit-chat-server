const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
require("dotenv").config();
const socketIo = require("socket.io");
const fs = require("fs");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/messages");
const groupRouter = require("./routes/groups");
const invitationRouter = require("./routes/invitations");
const userRouter = require("./routes/users");
const passwordRouter = require("./routes/passwords");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  region: "us-east-1", // e.g., us-east-1
});

const s3 = new AWS.S3();
const app = express();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/api/attachments", upload.single("file"), async (req, res) => {
  try {
    let attachmentUrl = null;
    console.log(req.file);
    if (req.file) {
      const fileContent = fs.readFileSync(req.file.path);
      const params = {
        Bucket: "expensetracker250923",
        Key: `uploads/${req.file.filename}`,
        Body: fileContent,
        ContentType: req.file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      attachmentUrl = uploadResult.Location;

      // Delete the temporary file after upload
      fs.unlinkSync(req.file.path);
    }

    res.status(201).json({ attachmentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

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
app.use("/api/passwords", passwordRouter);
