const express = require('express')
const User = require('../models/User')

const router = express.Router()

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
})

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Check if user is updating their own profile or is admin
    if (user._id.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' })
    }

    Object.assign(user, req.body)
    await user.save()

    res.json(user)
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res.status(500).json({ message: 'Error al actualizar usuario' })
  }
})

module.exports = router

