const router = require("express").Router()

// Import the user controller
const UserController = require("../controllers/users.controller")

// Define the routes
router.get("/", UserController.getAllUsers)
router.get("/:id", UserController.getUserById)
router.post("/", UserController.createUser)
router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

module.exports = router
