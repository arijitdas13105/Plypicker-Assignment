
"use client";

import React from "react";
import { useProduct } from "../Hooks/useProduct";
import ProductForm from "./ProductForm";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const ProductDetail = ({ id }) => {
  const { product, loading, error } = useProduct(id); // Use the custom hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-md">
          <p>{error}</p>
        </div>
      ) : product ? (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-4">
            <h1 className="text-3xl font-bold">Edit Product</h1>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.image && (
              <div className="flex justify-center md:justify-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg shadow-lg max-w-full h-72 object-contain"
                />
              </div>
            )}
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Product Details
              </h2>
              <ProductForm product={product} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 text-center">
            <p className="text-gray-500">Make sure to save your changes!</p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-lg shadow-md">
          <p>Product not found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

