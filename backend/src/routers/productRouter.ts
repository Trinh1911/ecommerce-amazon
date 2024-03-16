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
      brand,
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
      brand,
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