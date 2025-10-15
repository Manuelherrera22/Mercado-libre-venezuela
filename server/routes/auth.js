const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Create user
    const user = new User({ name, email, password })
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ message: 'Error al crear usuario' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Usuario inactivo' })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone
    })
  } catch (error) {
    console.error('Error en /me:', error)
    res.status(401).json({ message: 'Token inválido' })
  }
})

module.exports = router

