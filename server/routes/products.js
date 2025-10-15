const express = require('express')
const Product = require('../models/Product')
const Category = require('../models/Category')

const router = express.Router()

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      condition,
      freeShipping,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query

    // Build query
    const query = { isActive: true }

    if (category) {
      query.category = category
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (condition) {
      query.condition = condition
    }

    if (freeShipping === 'true') {
      query.freeShipping = true
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('seller', 'name email')
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Product.countDocuments(query)

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

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('seller', 'name email avatar')

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Increment views
    product.views += 1
    await product.save()

    res.json(product)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    res.status(500).json({ message: 'Error al obtener producto' })
  }
})

// Create product (requires authentication)
router.post('/', async (req, res) => {
  try {
    const productData = {
      ...req.body,
      seller: req.userId // This should be set by auth middleware
    }

    const product = new Product(productData)
    await product.save()

    res.status(201).json(product)
  } catch (error) {
    console.error('Error al crear producto:', error)
    res.status(500).json({ message: 'Error al crear producto' })
  }
})

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Check if user is the seller or admin
    if (product.seller.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' })
    }

    Object.assign(product, req.body)
    await product.save()

    res.json(product)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Check if user is the seller or admin
    if (product.seller.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' })
    }

    product.isActive = false
    await product.save()

    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
})

module.exports = router

