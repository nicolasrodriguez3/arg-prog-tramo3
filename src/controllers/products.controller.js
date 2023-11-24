const jwt = require("jsonwebtoken")
// Import the product model
const Product = require("../models/product.model")
const User = require("../models/user.model")
const getTokenFrom = require("../utils/getTokenFrom")

// Define your controller functions
const getAllProducts = async (req, res) => {
	try {
		// Retrieve all products from the database
		const products = await Product.find()
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

const getProductById = async (req, res) => {
	try {
		// Retrieve a product by its ID from the database
		const product = await Product.findById(req.params.id)
		if (!product) {
			return res.status(404).json({ error: "Product not found" })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

const createProduct = async (req, res) => {
	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	console.log({ decodedToken })
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "Token missing or invalid" })
	}
	
	try {
		const user = await User.findById(decodedToken.id)
		const { name, price, description, category, discount } = req.body
		// Create a new product in the database
		const product = await Product.create({
			name,
			price,
			description,
			category,
			discount,
			date: new Date(),
			user: user._id,
		})
		res.status(201).json(product)
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

const updateProduct = async (req, res) => {
	try {
		// Update a product in the database
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!product) {
			return res.status(404).json({ error: "Product not found" })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

const deleteProduct = async (req, res) => {
	try {
		// Delete a product from the database
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) {
			return res.status(404).json({ error: "Product not found" })
		}
		res.status(204).end()
	} catch (error) {
		res.status(500).json({ error: "Internal server error" })
	}
}

// Export your controller functions
module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
}
