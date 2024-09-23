const user = require("../model/user");
const jwt = require("jsonwebtoken");

const handleGetAllUsers = async (req, res) => {
  const users = await user.find({});

  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const { id } = req.params;
  const particularUser = await user.findById(id);
  return res.json(particularUser);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    res.json({ msg: "User doesn't exist!!" });
  }

  if (password !== existingUser.password) {
    res.json({ msg: "Incorrect email or password" });
  } else {
    res.json({ msg: "Login success" });
  }
};

const handleUpdateUserById = async (req, res) => {
  // const body = req.body;
  await user.findByIdAndUpdate(req.params.id, { first_name: "Ragnar" });

  return res.status(201).json({ msg: "success" });
};

const handleDeleteUserById = async (req, res) => {
  await user.findByIdAndDelete(req.params.id);
  return res.status(201), json({ status: "success" });
};

const handleAddUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new user({
      first_name,
      last_name,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  handleAddUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleLogin,
};
