const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const { connectDB } = require("./connection/connectDB");
const { logReqRes } = require("./middlewares");
const { handleUploadById } = require("./controller/controller");

const port = 8000;

const app = express();

// ******************* Connecting to mongoDB ******************

connectDB("mongodb://127.0.0.1:27017/learning");

// ****************** middle-ware ******************

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(logReqRes("log.txt"));

//****************** Routes ******************

app.use("/user", userRouter);
app.post("/user/upload/:id", handleUploadById);

app.listen(port, () => console.log(`Server started on port ${port}`));
