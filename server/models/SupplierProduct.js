const mongoose = require('mongoose')

const supplierProductSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  supplierProductId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  sku: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  specifications: {
    type: Map,
    of: String
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  syncStatus: {
    type: String,
    enum: ['pending', 'synced', 'error'],
    default: 'pending'
  },
  lastSync: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Índices para búsqueda rápida
supplierProductSchema.index({ supplier: 1, supplierProductId: 1 }, { unique: true })
supplierProductSchema.index({ category: 1 })
supplierProductSchema.index({ isActive: 1 })

module.exports = mongoose.model('SupplierProduct', supplierProductSchema)

