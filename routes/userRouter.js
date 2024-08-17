const express = require("express");
const router = express.Router();

const {
  handleAddUser,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
} = require("../controller/controller");

//******************** Get or add users ******************* */

router.route("/").get(handleGetAllUsers).post(handleAddUser);

//******************** Get, update and delete by ID ******************* */

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
