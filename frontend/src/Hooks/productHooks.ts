import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Product } from '../types/Product'

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  })
export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  })
export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<[]>(`/api/products/categories`)).data,
  })
export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async ({
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
    }: {
      name: string,
      slug: string,
      image: string,
      brand: string,
      category: string,
      description: string,
      price: number,
      countInStock: number,
      rating: number,
      numReviews: number
    }) =>
      (
        await apiClient.post<Product>(`api/products/create-product`, {
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
        })
      ).data,
  })
  export const useDeletedProduct = (id: string) =>
  useMutation({
    mutationFn: async () =>
      (
        await apiClient.delete<Product>(`api/products/deleted-product/${id}`)
      ).data,
  })