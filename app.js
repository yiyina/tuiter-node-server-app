// const express = require('express')
import express from "express";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";


const app = express();
const allowedURLs = [
  "http://localhost:3000",
  "http://10.0.0.18:3000",
  "https://tuiter-node-server-app-yina-c3a0f512bf1a.herokuapp.com/",
  "http://localhost:4000"
];
app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // if(allowedURLs.includes(origin)) {
        //   callback(null, true);
        // } else {
        //   callback(new Error("Not allowed by CORS"));
        // }
        callback(null, true);
      }
    })
)
// app.use(
//     cors({
//       credentials: true,
//       origin: process.env.FRONTEND_URL,
//     })
// );
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);