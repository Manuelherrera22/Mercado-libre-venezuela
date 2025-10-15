const express = require('express')
const LocalOrder = require('../models/LocalOrder')

const router = express.Router()

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { vendor, supplier, status } = req.query
    
    const query = {}
    if (vendor) query.vendor = vendor
    if (supplier) query['items.supplier'] = supplier
    if (status) query.status = status
    
    const orders = await LocalOrder.find(query)
      .populate('customer', 'name email')
      .populate('vendor', 'name email')
      .populate('items.product')
      .populate('items.supplier', 'name city state')
      .sort({ createdAt: -1 })
    
    res.json(orders)
  } catch (error) {
    console.error('Error al obtener pedidos:', error)
    res.status(500).json({ message: 'Error al obtener pedidos' })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await LocalOrder.findById(req.params.id)
      .populate('customer')
      .populate('vendor')
      .populate('items.product')
      .populate('items.supplier')
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }
    res.json(order)
  } catch (error) {
    console.error('Error al obtener pedido:', error)
    res.status(500).json({ message: 'Error al obtener pedido' })
  }
})

// Create order
router.post('/', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      customer: req.userId,
      vendor: req.userId
    }
    
    const order = new LocalOrder(orderData)
    await order.save()
    
    const populated = await LocalOrder.findById(order._id)
      .populate('customer')
      .populate('vendor')
      .populate('items.product')
      .populate('items.supplier')
    
    res.status(201).json(populated)
  } catch (error) {
    console.error('Error al crear pedido:', error)
    res.status(500).json({ message: 'Error al crear pedido' })
  }
})

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, tracking } = req.body
    
    const order = await LocalOrder.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }
    
    order.status = status
    if (tracking) {
      order.tracking = { ...order.tracking, ...tracking }
    }
    
    await order.save()
    
    const populated = await LocalOrder.findById(order._id)
      .populate('customer')
      .populate('vendor')
      .populate('items.product')
      .populate('items.supplier')
    
    res.json(populated)
  } catch (error) {
    console.error('Error al actualizar estado:', error)
    res.status(500).json({ message: 'Error al actualizar estado' })
  }
})

// Update payment status
router.patch('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus, reference, proof } = req.body
    
    const order = await LocalOrder.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }
    
    order.paymentStatus = paymentStatus
    if (reference) order.paymentMethod.reference = reference
    if (proof) order.paymentMethod.proof = proof
    
    await order.save()
    
    res.json(order)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
    res.status(500).json({ message: 'Error al actualizar pago' })
  }
})

module.exports = router

