// Import the necessary modules and models
const User = require("../models/user.model")

// Controller function to handle user-related operations
const UserController = {
	// Get all users
	getAllUsers: async (req, res) => {
		const users = await User.find({})

		res.json(users)
	},

	// Get a single user by ID
	getUserById: async (req, res) => {
		const { id } = req.params

		res.send(`Get user with ID: ${id}`)
	},

	// Create a new user
	createUser: async (req, res) => {
		const { name, email, password } = req.body
		const user = await User.create({ name, email, password })

		res.json(user)
	},

	// Update a user by ID
	updateUser: async (req, res) => {
		const { id } = req.params
		const { name, email, password } = req.body

		const updatedUser = User.findByIdAndUpdate(id, { name, email, password }, { new: true })

		res.status(204).json(updatedUser)
	},

	// Delete a user by ID
	deleteUser: async (req, res) => {
		const { id } = req.params

    await User.findByIdAndDelete(id)

    res.status(204).end()
	},
}

module.exports = UserController
