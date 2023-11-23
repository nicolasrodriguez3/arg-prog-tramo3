const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")

// Route for user registration
router.post("/register", authController.registerController)

// Route for user login
router.post("/login", authController.loginController)

// Route for user logout
router.get("/logout", (req, res) => {
	// Handle user logout logic here
})

module.exports = router
