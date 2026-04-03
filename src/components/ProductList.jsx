import React, { useContext, useEffect, useMemo } from "react";
import { EcommerceContext } from "../context/EcommerceContext";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

const ProductList = ({ searchTerm = "" }) => {
  const { state, fetchProducts } = useContext(EcommerceContext);
  const { products, filters, loading } = state;

  // Fetch products only once on mount
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // useMemo keeps the filtering performance high
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Logic (API uses .title)
      const matchesSearch = (product.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 2. Category Logic (Compare name string to filter string)
      const currentFilter = (filters.category || "all").toLowerCase().trim();
      const productCatName = (product.category?.name || "")
        .toLowerCase()
        .trim();

      const matchesCategory =
        currentFilter === "all" || productCatName === currentFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, filters.category, searchTerm]);

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Loading Store...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Category Buttons Section */}
      <CategoryFilter />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
