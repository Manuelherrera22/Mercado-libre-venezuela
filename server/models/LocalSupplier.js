const mongoose = require('mongoose')

const localSupplierSchema = new mongoose.Schema({
  // Información básica
  name: {
    type: String,
    required: true,
    trim: true
  },
  rif: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
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
  whatsapp: {
    type: String,
    default: null
  },
  
  // Ubicación
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    default: null
  },
  
  // Métodos de pago
  paymentMethods: [{
    type: {
      type: String,
      enum: ['pagomovil', 'transferencia', 'zelle', 'paypal', 'cash'],
      required: true
    },
    details: {
      phone: String,
      ci: String,
      bank: String,
      account: String,
      email: String
    }
  }],
  
  // Información de negocio
  businessType: {
    type: String,
    enum: ['retailer', 'wholesaler', 'manufacturer', 'distributor'],
    required: true
  },
  categories: [{
    type: String
  }],
  
  // Configuración de dropshipping
  dropshippingEnabled: {
    type: Boolean,
    default: true
  },
  minOrder: {
    type: Number,
    default: 0
  },
  commission: {
    type: Number,
    default: 15,
    min: 0,
    max: 100
  },
  
  // Envíos
  shippingZones: [{
    state: String,
    cities: [String],
    cost: Number,
    estimatedDays: Number
  }],
  freeShippingThreshold: {
    type: Number,
    default: 50
  },
  
  // Inventario
  inventoryType: {
    type: String,
    enum: ['local', 'dropshipping', 'hybrid'],
    default: 'local'
  },
  autoSyncStock: {
    type: Boolean,
    default: false
  },
  
  // Calificación
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  
  // Estado
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Documentos
  documents: {
    rif: String,
    ci: String,
    businessLicense: String
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

module.exports = mongoose.model('LocalSupplier', localSupplierSchema)

