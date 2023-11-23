const router = require("express").Router()

// Import the file controller
const { uploadFile } = require("../controllers/files.controller")

// Define the routes
router.post("/upload", uploadFile)

module.exports = router
