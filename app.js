require("./src/config/mongoose.config")

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const app = express()
const usersRoutes = require("./src/routes/users.routes")
const filesRouter = require("./src/routes/files.routes")
const middleware = require("./utils/middleware")

// Middlewares
app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(fileUpload())

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use("/api/users", usersRoutes)
app.use("/files", filesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
