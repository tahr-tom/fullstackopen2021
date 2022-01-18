const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const server = http.createServer(app)

const PORT = config.PORT || 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})