const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const port = 8000;

const app = express();

// *******************Schema******************

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
);

// ******************* Connecting to mongoDB ******************

try {
  mongoose.connect("mongodb://127.0.0.1:27017/learning");
  console.log("MongoDB connected");
} catch (err) {
  console.log("Error: ", err);
}

// ******************* Model ******************

const user = mongoose.model("user", userSchema);

// ****************** middle-ware ******************

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let log = `\n${Date.now()} : ${req.method} : ${req.path}`;
  fs.appendFile("./log.txt", log, (err, data) => {
    next();
  });
});

//****************** Routes ******************

app.get("/users", async (req, res) => {
  const users = await user.find({});
  const html = `
   <table border="1" cellpadding="2" cellspacing="3">
    <tr>
    <th>First name </th>
    <th>last name </th>
    <th>email </th>
    <th>gender </th>
    </tr>
    <tr>
     ${users
       .map(
         (user) => ` <tr>
                           <td>${user.first_name}</td>  
                           <td>${user.last_name}</td>  
                           <td>${user.email}</td>  
                           <td>${user.gender}</td>  
                  </tr>`
       )
       .join("")}
  
     </table>`;
  res.send(html);
});

//****************** rest api ******************

app.get("/api/users", async (req, res) => {
  const users = await user.find({});

  return res.json(users);
});

app
  .route("/api/user/:id")
  .get(async (req, res) => {
    const particularUser = await user.findById(req.params.id);
    return res.json(particularUser);
  })
  .patch(async (req, res) => {
    const body = req.body;
    await user.findByIdAndUpdate(req.params.id, { first_name: "Ragnar" });

    return res.status(201).json({ msg: "success" });
  })
  .delete(async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    return res.status(201), json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const result = await user.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  console.log("result : ", result);

  return res.status(201).json({
    msg: "Success",
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
