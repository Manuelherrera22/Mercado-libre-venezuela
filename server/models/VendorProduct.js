const mongoose = require('mongoose')

const vendorProductSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplierProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupplierProduct',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  // Precio del proveedor
  supplierPrice: {
    type: Number,
    required: true
  },
  // Precio de venta del vendedor
  sellingPrice: {
    type: Number,
    required: true
  },
  // Margen de ganancia
  profitMargin: {
    type: Number,
    required: true
  },
  // Comisión de la plataforma
  platformCommission: {
    type: Number,
    default: 10
  },
  // Estado del producto
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'out_of_stock'],
    default: 'draft'
  },
  // Personalización del vendedor
  customTitle: {
    type: String,
    default: ''
  },
  customDescription: {
    type: String,
    default: ''
  },
  customImages: [{
    type: String
  }],
  // Métricas
  views: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  revenue: {
    type: Number,
    default: 0
  },
  // Sincronización
  lastSync: {
    type: Date,
    default: Date.now
  },
  autoSync: {
    type: Boolean,
    default: true
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

// Índices
vendorProductSchema.index({ vendor: 1, supplierProduct: 1 }, { unique: true })
vendorProductSchema.index({ vendor: 1, status: 1 })
vendorProductSchema.index({ supplier: 1 })

module.exports = mongoose.model('VendorProduct', vendorProductSchema)

