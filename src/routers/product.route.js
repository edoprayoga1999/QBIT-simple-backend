const express = require("express")
const router = express.Router()
const { createProduct, showAllProduct, updateProduct, deleteProduct } = require("../controllers/product.controller")
const upload = require("../middlewares/upload")

router
  .get('/product', showAllProduct)
  .post('/product/create', upload, createProduct)
  .put('/product/update/:id', upload, updateProduct)
  .delete('/product/delete/:id', deleteProduct)

module.exports = router