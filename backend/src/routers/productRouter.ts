import express from 'express'
import asyncHandler from 'express-async-handler'
import { Product, ProductModel } from '../models/productModel'
import { isAuth } from '../utils'
export const productRouter = express.Router()
// /api/products
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)
// /api/slug/tshirt
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)
productRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await ProductModel.find().distinct('category')
    res.json(categories)
  })
)
//   create product
productRouter.post(
  '/create-product',
  isAuth,
  asyncHandler(async (req, res) => {
    const fileData = req.file
    console.log('fileData', fileData)
    const {
      name,
      slug,
      image,
      CountryOrigin,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews
    } = req.body;
    const product = await ProductModel.create({
      name,
      slug,
      image,
      CountryOrigin,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews
    });

    res.status(200).json({
      message: 'Product created successfully',
      product
    });
  })
)
// delete product
productRouter.delete(
  '/deleted-product/:id',
  isAuth,
  asyncHandler(async (req, res) => {

    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'User not found' })
    }
    const result = await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({
      message: 'Product deleted'
    });
  })
)
// update product
productRouter.put(
  '/update-product/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId)
    if (product) {
      product.name = req.body.name || product.name
      product.slug = req.body.slug || product.slug
      product.image = req.body.image || product.image
      product.CountryOrigin = req.body.CountryOrigin || product.CountryOrigin
      product.category = req.body.category || product.category
      product.description = req.body.description || product.description
      product.price = req.body.price || product.price
      product.countInStock = req.body.countInStock || product.countInStock
      product.rating = req.body.rating || product.rating
      product.numReviews = req.body.numReviews || product.numReviews
      const updatedproduct = await product.save()
      res.send({
        name: updatedproduct.name,
        slug: updatedproduct.slug,
        image: updatedproduct.image,
        CountryOrigin: updatedproduct.CountryOrigin,
        category: updatedproduct.category,
        description: updatedproduct.description,
        price: updatedproduct.price,
        countInStock: updatedproduct.countInStock,
        rating: updatedproduct.rating,
        numReviews: updatedproduct.numReviews,
      })
      return
    }

    res.status(404).json({ message: 'Product not found' })
  })
)