import { Product } from "./types/Product"

export const sampleProducts: Product[] = [
    {
        name: "Nike Slim shirt",
        slug: "nike-slim-shirt",
        image: "../images/p1.jpg",
        category: "Shirts",
        brand: "Nike",
        price: 120,
        countInStock: 10,
        desription: "high quality shirt",
        rating: 4.5,
        numReviews: 10,

    },
    {
        name: "Lacoste Slim shirt",
        slug: "lacoste-slim-shirt",
        image: "../images/p3.jpg",
        category: "Shirts",
        brand: "Lacoste",
        price: 220,
        countInStock: 0,
        desription: "high quality shirt",
        rating: 4.8,
        numReviews: 17,

    },
    {
        name: "Nike Slim Pant",
        slug: "nike-slim-pant",
        image: "../images/p4.jpg",
        category: "pants",
        brand: "Nike",
        price: 80,
        countInStock: 10,
        desription: "high quality pant",
        rating: 4.5,
        numReviews: 10,
    }
]