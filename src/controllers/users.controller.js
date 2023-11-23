// Import the necessary modules and models
const User = require("../models/user.model")

// Controller function to handle user-related operations
const UserController = {
	// Get all users
	getAllUsers: async (req, res, next) => {
		try {
			const users = await User.find({})
			res.json(users)
		} catch (error) {
			next(error)
		}
	},

	// Get a single user by ID
	getUserById: async (req, res, next) => {
		const { id } = req.params

		try {
			const user = await User.findById(id)
			if (user) {
				res.json(user)
			} else {
				res.status(404).end()
			}
		} catch (error) {
			next(error)
		}
	},

	// Create a new user
	createUser: async (req, res, next) => {
		const { name, email, password } = req.body
		try {
			const user = await User.create({ name, email, password })

			res.json(user)
			console.log(user)
		} catch (error) {
			if (error.code === 11000) {
				// Error de duplicado (clave única)
				res.status(400).json({ error: "El usuario ya existe" })
			} else {
				next(error)
			}
		}
	},

	// Update a user by ID
	updateUser: async (req, res, next) => {
		const { id } = req.params
		const { name, email, password } = req.body

		try {
			const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true })
			res.json(updatedUser)
		} catch (error) {
			next(error)
		}
	},

	// Delete a user by ID
	deleteUser: async (req, res, next) => {
		const { id } = req.params

		try {
			await User.findByIdAndDelete(id)
			res.status(204).end()
		} catch (error) {
			next(error)
		}
	},
}

module.exports = UserController
