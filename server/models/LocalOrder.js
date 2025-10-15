const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LocalSupplier',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  supplierPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  }
})

const localOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Cliente
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Vendedor (quien vende el producto)
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Items
  items: [orderItemSchema],
  
  // Totales
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    default: 0
  },
  platformCommission: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  
  // Estado
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // Dirección de envío
  shippingAddress: {
    name: String,
    phone: String,
    state: String,
    city: String,
    address: String,
    zipCode: String,
    instructions: String
  },
  
  // Método de pago
  paymentMethod: {
    type: {
      type: String,
      enum: ['pagomovil', 'transferencia', 'zelle', 'cash'],
      required: true
    },
    reference: String,
    proof: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  
  // Tracking
  tracking: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  
  // Notas
  notes: {
    type: String,
    default: ''
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Generar número de orden
localOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('LocalOrder').countDocuments()
    this.orderNumber = `ORD-VE-${Date.now()}-${count + 1}`
  }
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('LocalOrder', localOrderSchema)

