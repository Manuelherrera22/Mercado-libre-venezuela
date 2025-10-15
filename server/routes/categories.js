const express = require('express')
const Category = require('../models/Category')

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ order: 1, name: 1 })

    res.json(categories)
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    res.status(500).json({ message: 'Error al obtener categorías' })
  }
})

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name slug')

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    res.json(category)
  } catch (error) {
    console.error('Error al obtener categoría:', error)
    res.status(500).json({ message: 'Error al obtener categoría' })
  }
})

// Create category (admin only)
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()

    res.status(201).json(category)
  } catch (error) {
    console.error('Error al crear categoría:', error)
    res.status(500).json({ message: 'Error al crear categoría' })
  }
})

module.exports = router

