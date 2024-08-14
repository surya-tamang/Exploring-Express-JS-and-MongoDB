const express = require("express");
const fs = require("fs");
let users = require("./MOCK_DATA.json");
const port = 8000;

const app = express();

// middle-ware

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let log = `\n${Date.now()} : ${req.method} : ${req.path}`;
  fs.appendFile("./log.txt", log, (err, data) => {
    next();
  });
});

// Routes

app.get("/users", (req, res) => {
  const html = `
     <ul>
     ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
     </ul>`;
  res.send(html);
});

// rest api

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    let body = req.body;

    const userIndex = users.findIndex((user) => user.id == id);
    let updatedUser = { ...body, id: id };

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users[userIndex] = { ...userIndex[userIndex], ...updatedUser };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }
      return res.json({ status: "success", updated_id: id });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    users = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  console.log(body);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
