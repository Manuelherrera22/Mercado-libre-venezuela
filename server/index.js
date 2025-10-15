const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/users', require('./routes/users'))
app.use('/api/suppliers', require('./routes/suppliers'))
app.use('/api/vendor-products', require('./routes/vendor-products'))
app.use('/api/local-suppliers', require('./routes/local-suppliers'))
app.use('/api/local-orders', require('./routes/local-orders'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' })
})

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mercadolibre-ve'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
})
