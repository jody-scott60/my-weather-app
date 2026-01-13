const express = require("express");
const { mongoose } = require("mongoose");
const { connectDB } = require("./config/db");
const userRouter = require("./router/userRouter");
const weatherRouter = require("./router/weatherRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mongoose.connection;

db.on("error", () => console.log("MongoDB Error"));
db.on("disconnect", () => console.log("MongoDB disconnected"));

connectDB();

app.use("/user", userRouter);
app.use("/weather", weatherRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
