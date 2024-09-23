const express = require("express");
const router = express.Router();

const {
  handleAddUser,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleLogin,
} = require("../controller/controller");

const { verify } = require("../middlewares");

//******************** Get or add users ******************* */

router.route("/").get(handleGetAllUsers).post(handleAddUser);

router.route("/login").post(handleLogin);

//******************** Get, update and delete by ID ******************* */

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(verify, handleDeleteUserById);

module.exports = router;
