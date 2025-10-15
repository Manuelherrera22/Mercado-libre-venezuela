const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'China'
  },
  apiKey: {
    type: String,
    required: true
  },
  apiUrl: {
    type: String,
    required: true
  },
  commission: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  shippingDays: {
    min: {
      type: Number,
      default: 7
    },
    max: {
      type: Number,
      default: 15
    }
  },
  categories: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  autoSync: {
    type: Boolean,
    default: false
  },
  syncFrequency: {
    type: String,
    enum: ['hourly', 'daily', 'weekly'],
    default: 'daily'
  },
  lastSync: {
    type: Date,
    default: null
  },
  productsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Supplier', supplierSchema)

