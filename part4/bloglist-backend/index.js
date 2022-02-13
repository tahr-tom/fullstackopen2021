const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})