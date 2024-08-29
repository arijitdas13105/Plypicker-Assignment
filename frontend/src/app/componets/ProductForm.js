"use client";

import React from "react";
import Cropper from "react-easy-crop";
import { useProduct } from "../Hooks/useProduct";

const ProductForm = ({ product }) => {
  const {
    formData,
    uploadProgress,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImageUrl,
    userRole,
    onChange,
    onCropComplete,
    handleSubmit,
    handleBackClick,
  } = useProduct(product._id);

  const { name, description, price } = formData;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Product Name"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Product Description"
          name="description"
          value={description}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Product Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="file"
          name="image"
          onChange={onChange}
        />

        {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden">
              <div
                className="bg-blue-500 h-full text-xs flex items-center justify-center text-white"
                style={{
                  width: `${uploadProgress}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              >
                <span className="absolute right-2 text-sm font-semibold">
                  {uploadProgress.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {croppedImageUrl && (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={croppedImageUrl}
              crop={crop}
              setCrop={setCrop}
              zoom={zoom}
              setZoom={setZoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {userRole === "admin"
            ? "Update Product"
            : "Submit Changes for Approval"}
        </button>
      </div>
      <button
        type="button"
        onClick={handleBackClick}
        className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 hover:scale-105"
      >
        Back
      </button>
    </form>
  );
};

export default ProductForm;
