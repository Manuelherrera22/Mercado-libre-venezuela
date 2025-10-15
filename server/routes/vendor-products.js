const express = require('express')
const VendorProduct = require('../models/VendorProduct')
const SupplierProduct = require('../models/SupplierProduct')

const router = express.Router()

// Get vendor's products
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const products = await VendorProduct.find({ vendor: req.params.vendorId })
      .populate('supplierProduct')
      .populate('supplier')
      .sort({ createdAt: -1 })

    res.json(products)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).json({ message: 'Error al obtener productos' })
  }
})

// Add product from supplier to vendor
router.post('/', async (req, res) => {
  try {
    const { vendor, supplierProduct, supplierPrice, profitMargin } = req.body

    // Calcular precio de venta
    const sellingPrice = supplierPrice * (1 + profitMargin / 100)

    // Verificar si el producto ya existe
    const existing = await VendorProduct.findOne({
      vendor,
      supplierProduct
    })

    if (existing) {
      return res.status(400).json({ message: 'Producto ya agregado' })
    }

    const vendorProduct = new VendorProduct({
      vendor,
      supplierProduct,
      supplier: (await SupplierProduct.findById(supplierProduct)).supplier,
      supplierPrice,
      sellingPrice,
      profitMargin,
      status: 'draft'
    })

    await vendorProduct.save()

    const populated = await VendorProduct.findById(vendorProduct._id)
      .populate('supplierProduct')
      .populate('supplier')

    res.status(201).json(populated)
  } catch (error) {
    console.error('Error al agregar producto:', error)
    res.status(500).json({ message: 'Error al agregar producto' })
  }
})

// Update vendor product
router.put('/:id', async (req, res) => {
  try {
    const { sellingPrice, profitMargin, status, customTitle, customDescription } = req.body

    const vendorProduct = await VendorProduct.findById(req.params.id)
    if (!vendorProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Recalcular precio si cambió el margen
    if (profitMargin !== undefined) {
      vendorProduct.profitMargin = profitMargin
      vendorProduct.sellingPrice = vendorProduct.supplierPrice * (1 + profitMargin / 100)
    }

    if (sellingPrice !== undefined) {
      vendorProduct.sellingPrice = sellingPrice
    }

    if (status !== undefined) {
      vendorProduct.status = status
    }

    if (customTitle !== undefined) {
      vendorProduct.customTitle = customTitle
    }

    if (customDescription !== undefined) {
      vendorProduct.customDescription = customDescription
    }

    await vendorProduct.save()

    const populated = await VendorProduct.findById(vendorProduct._id)
      .populate('supplierProduct')
      .populate('supplier')

    res.json(populated)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
})

// Delete vendor product
router.delete('/:id', async (req, res) => {
  try {
    const vendorProduct = await VendorProduct.findByIdAndDelete(req.params.id)
    if (!vendorProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
})

// Bulk add products
router.post('/bulk', async (req, res) => {
  try {
    const { vendor, products } = req.body

    const results = {
      added: 0,
      skipped: 0,
      errors: []
    }

    for (const productData of products) {
      try {
        const { supplierProduct, supplierPrice, profitMargin } = productData

        const existing = await VendorProduct.findOne({
          vendor,
          supplierProduct
        })

        if (existing) {
          results.skipped++
          continue
        }

        const sellingPrice = supplierPrice * (1 + profitMargin / 100)

        const vendorProduct = new VendorProduct({
          vendor,
          supplierProduct,
          supplier: (await SupplierProduct.findById(supplierProduct)).supplier,
          supplierPrice,
          sellingPrice,
          profitMargin,
          status: 'draft'
        })

        await vendorProduct.save()
        results.added++
      } catch (error) {
        results.errors.push({
          product: productData,
          error: error.message
        })
      }
    }

    res.json(results)
  } catch (error) {
    console.error('Error al agregar productos:', error)
    res.status(500).json({ message: 'Error al agregar productos' })
  }
})

module.exports = router

