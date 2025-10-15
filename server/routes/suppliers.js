const express = require('express')
const Supplier = require('../models/Supplier')
const SupplierProduct = require('../models/SupplierProduct')

const router = express.Router()

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find({ isActive: true })
    res.json(suppliers)
  } catch (error) {
    console.error('Error al obtener proveedores:', error)
    res.status(500).json({ message: 'Error al obtener proveedores' })
  }
})

// Get single supplier
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' })
    }
    res.json(supplier)
  } catch (error) {
    console.error('Error al obtener proveedor:', error)
    res.status(500).json({ message: 'Error al obtener proveedor' })
  }
})

// Get supplier products
router.get('/:id/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query
    
    const query = { 
      supplier: req.params.id,
      isActive: true 
    }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ]
    }

    const products = await SupplierProduct.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await SupplierProduct.countDocuments(query)

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).json({ message: 'Error al obtener productos' })
  }
})

// Create supplier
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier(req.body)
    await supplier.save()
    res.status(201).json(supplier)
  } catch (error) {
    console.error('Error al crear proveedor:', error)
    res.status(500).json({ message: 'Error al crear proveedor' })
  }
})

// Update supplier
router.put('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' })
    }
    res.json(supplier)
  } catch (error) {
    console.error('Error al actualizar proveedor:', error)
    res.status(500).json({ message: 'Error al actualizar proveedor' })
  }
})

// Sync products from supplier
router.post('/:id/sync', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' })
    }

    // Aquí iría la lógica de sincronización con la API del proveedor
    // Por ahora simulamos la sincronización
    
    const mockProducts = [
      {
        supplierProductId: 'SP001',
        name: 'Smartphone Android 5G',
        price: 150,
        stock: 100,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500']
      },
      {
        supplierProductId: 'SP002',
        name: 'Laptop Gaming 16GB RAM',
        price: 800,
        stock: 50,
        category: 'Computers',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500']
      }
    ]

    let synced = 0
    for (const productData of mockProducts) {
      const existingProduct = await SupplierProduct.findOne({
        supplier: supplier._id,
        supplierProductId: productData.supplierProductId
      })

      if (existingProduct) {
        // Actualizar producto existente
        Object.assign(existingProduct, productData)
        existingProduct.lastSync = new Date()
        existingProduct.syncStatus = 'synced'
        await existingProduct.save()
      } else {
        // Crear nuevo producto
        const newProduct = new SupplierProduct({
          ...productData,
          supplier: supplier._id
        })
        await newProduct.save()
      }
      synced++
    }

    // Actualizar información del proveedor
    supplier.lastSync = new Date()
    supplier.productsCount = await SupplierProduct.countDocuments({ supplier: supplier._id })
    await supplier.save()

    res.json({
      message: 'Sincronización completada',
      synced,
      total: supplier.productsCount
    })
  } catch (error) {
    console.error('Error al sincronizar productos:', error)
    res.status(500).json({ message: 'Error al sincronizar productos' })
  }
})

module.exports = router

