import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'
import { WhistListItem } from './types/WhistList'
export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}
export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}
export const convertProductToWhistList = (product: Product): WhistListItem => {
  const WhistListItem: WhistListItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return WhistListItem
}
export const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });