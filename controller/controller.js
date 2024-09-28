const user = require("../model/user");
const jwt = require("jsonwebtoken");

const handleGetAllUsers = async (req, res) => {
  const users = await user.find({});

  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const particularUser = await user.findById(id);
    return res.json({
      user: particularUser,
    });
  } catch (err) {
    res.status(400).json({ msg: "Server Error" });
    console.log(err);
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await user.findOne({ email });
  if (existingUser) {
    if (password !== existingUser.password) {
      res.status(400).json({ msg: "Incorrect email or password" });
    } else {
      const accessToken = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          password: existingUser.password,
        },
        "mySeCretKey",
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          password: existingUser.password,
        },
        "mySeCretKey",
        {
          expiresIn: "7d",
        }
      );

      res.status(201).json({
        msg: "Login success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } else {
    res.status(401).json({ msg: "User doesn't exist!!" });
  }
};

const handleUpdateUserById = async (req, res) => {
  // const body = req.body;
  await user.findByIdAndUpdate(req.params.id, req.body);

  return res.status(201).json({ msg: "success" });
};

const handleDeleteUserById = async (req, res) => {
  if (req.user.id === req.params.id) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You can't delete this");
  }
  // await user.findByIdAndDelete(req.params.id);
  // return res.status(201), json({ status: "success" });
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

const handleUploadById = async (req, res) => {
  const { img } = req.body;
  const { id } = req.params;

  if (!img) {
    return res.status(400).json({ msg: "Image is missing" });
  }
  try {
    const updateUser = await user.findByIdAndUpdate(
      id,
      { profile: img },
      { new: true }
    );

    res.status(201).json({
      msg: "Uploaded successfully",
      profile: updateUser.profile.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  handleAddUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleLogin,
  handleUploadById,
};
