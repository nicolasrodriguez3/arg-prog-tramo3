require("dotenv").config()

const app = require("./app") // la aplicación Express real
const http = require("http")
const PORT = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
