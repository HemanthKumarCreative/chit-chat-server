const io = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIO = io(server);
