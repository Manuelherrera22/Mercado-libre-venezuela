const express = require('express')
const LocalSupplier = require('../models/LocalSupplier')

const router = express.Router()

// Get all local suppliers
router.get('/', async (req, res) => {
  try {
    const { state, city, category, verified } = req.query
    
    const query = { isActive: true }
    
    if (state) query.state = state
    if (city) query.city = city
    if (category) query.categories = { $in: [category] }
    if (verified === 'true') query.isVerified = true
    
    const suppliers = await LocalSupplier.find(query)
      .sort({ rating: -1, reviewsCount: -1 })
    
    res.json(suppliers)
  } catch (error) {
    console.error('Error al obtener proveedores locales:', error)
    res.status(500).json({ message: 'Error al obtener proveedores' })
  }
})

// Get single supplier
router.get('/:id', async (req, res) => {
  try {
    const supplier = await LocalSupplier.findById(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' })
    }
    res.json(supplier)
  } catch (error) {
    console.error('Error al obtener proveedor:', error)
    res.status(500).json({ message: 'Error al obtener proveedor' })
  }
})

// Create supplier
router.post('/', async (req, res) => {
  try {
    const supplier = new LocalSupplier(req.body)
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
    const supplier = await LocalSupplier.findByIdAndUpdate(
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

// Get suppliers by state/city
router.get('/location/:state/:city?', async (req, res) => {
  try {
    const { state, city } = req.params
    const query = { state, isActive: true }
    
    if (city) query.city = city
    
    const suppliers = await LocalSupplier.find(query)
      .sort({ rating: -1 })
    
    res.json(suppliers)
  } catch (error) {
    console.error('Error al obtener proveedores por ubicación:', error)
    res.status(500).json({ message: 'Error al obtener proveedores' })
  }
})

// Calculate shipping cost
router.post('/calculate-shipping', async (req, res) => {
  try {
    const { supplierId, destinationState, destinationCity, orderValue } = req.body
    
    const supplier = await LocalSupplier.findById(supplierId)
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' })
    }
    
    // Buscar zona de envío
    const shippingZone = supplier.shippingZones.find(
      zone => zone.state === destinationState && 
      (zone.cities.includes(destinationCity) || zone.cities.length === 0)
    )
    
    let shippingCost = 0
    let estimatedDays = 7
    
    if (shippingZone) {
      shippingCost = shippingZone.cost
      estimatedDays = shippingZone.estimatedDays
    } else {
      // Costo por defecto
      shippingCost = 5
    }
    
    // Envío gratis si supera el threshold
    if (orderValue >= supplier.freeShippingThreshold) {
      shippingCost = 0
    }
    
    res.json({
      shippingCost,
      estimatedDays,
      freeShipping: orderValue >= supplier.freeShippingThreshold
    })
  } catch (error) {
    console.error('Error al calcular envío:', error)
    res.status(500).json({ message: 'Error al calcular envío' })
  }
})

module.exports = router

