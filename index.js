const express = require("express");
const userRouter = require("./routes/userRouter");
const { connectDB } = require("./connection/connectDB");
const { logReqRes } = require("./middlewares");

const port = 8000;

const app = express();

// ******************* Connecting to mongoDB ******************

connectDB("mongodb://127.0.0.1:27017/learning");

// ****************** middle-ware ******************

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));

//****************** Routes ******************

app.use("/user", userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
