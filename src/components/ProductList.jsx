import React, { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

const ProductList = ({ searchTerm = "" }) => {
  // Default value for searchTerm
  const { state } = useContext(EcommerceContext);
  const { filters } = state;

  // Sample product data (this should ideally be fetched from an API)
  const allProducts = [
    {
      id: 1,
      name: "Smartphone",
      category: "electronics",
      price: 699,
      image: "src/assets/Smartphone.jpeg",
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "clothing",
      price: 29,
      image: "src/assets/T-Shirt.jpeg",
    },
    {
      id: 3,
      name: "Laptop",
      category: "electronics",
      price: 999,
      image: "src/assets/Laptop.jpeg",
    },
    {
      id: 4,
      name: "Sneakers",
      category: "footwear",
      price: 89,
      image: "src/assets/Sneakers.jpeg",
    },
    {
      id: 5,
      name: "Coffee Mug",
      category: "home",
      price: 15,
      image: "src/assets/CoffeeMug.jpeg",
    },
    {
      id: 6,
      name: "Headphones",
      category: "electronics",
      price: 199,
      image: "src/assets/Headphones.jpeg",
    },
    {
      id: 7,
      name: "Backpack",
      category: "accessories",
      price: 45,
      image: "src/assets/Backpack.jpeg",
    },
    {
      id: 8,
      name: "Digital Watch",
      category: "electronics",
      price: 250,
      image: "src/assets/DigitalWatch.jpeg",
    },
    {
      id: 9,
      name: "Jeans",
      category: "clothing",
      price: 49,
      image: "src/assets/Jeans.jpeg",
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      category: "electronics",
      price: 129,
      image: "src/assets/BluetoothSpeaker.jpeg",
    },
    // Add more products as needed
  ];

  // Filter products based on the selected category and search term
  const filteredProducts = allProducts.filter(
    (product) =>
      (filters.category === "all" || product.category === filters.category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Safe to call toLowerCase()
  );

  return (
    <div>
      <CategoryFilter />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
