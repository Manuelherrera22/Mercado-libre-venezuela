const express = require('express')
const Order = require('../models/Order')

const router = express.Router()

// Get all orders (user's orders)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.product', 'name images price')
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
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email')

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
      user: req.userId
    }

    const order = new Order(orderData)
    await order.save()

    res.status(201).json(order)
  } catch (error) {
    console.error('Error al crear pedido:', error)
    res.status(500).json({ message: 'Error al crear pedido' })
  }
})

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }

    order.status = status
    await order.save()

    res.json(order)
  } catch (error) {
    console.error('Error al actualizar estado:', error)
    res.status(500).json({ message: 'Error al actualizar estado' })
  }
})

module.exports = router

