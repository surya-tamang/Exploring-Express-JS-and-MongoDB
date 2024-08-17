const user = require("../model/user");

const handleGetAllUsers = async (req, res) => {
  const users = await user.find({});

  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const particularUser = await user.findById(req.params.id);
  return res.json(particularUser);
};

const handleUpdateUserById = async (req, res) => {
  const body = req.body;
  await user.findByIdAndUpdate(req.params.id, { first_name: "Ragnar" });

  return res.status(201).json({ msg: "success" });
};

const handleDeleteUserById = async (req, res) => {
  await user.findByIdAndDelete(req.params.id);
  return res.status(201), json({ status: "success" });
};

const handleAddUser = async (req, res) => {
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
    newID: result.id,
  });
};

module.exports = {
  handleAddUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
