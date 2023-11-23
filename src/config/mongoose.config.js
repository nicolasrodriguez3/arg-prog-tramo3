const mongoose = require("mongoose")

// Connection URL for MongoDB Atlas
const uri = process.env.MONGODB_URI

// Connect to MongoDB Atlas
mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connection established"))
	.catch((err) => console.log(err))
