

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../utils/baseUrl";
import LoadingSpinner from "../utils/LoadingSpinner";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const currentUserEmail = localStorage.getItem("email");

  // useEffect(() => {

  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await axios.get(`${baseUrl}/api/products`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });

  //       console.log("Products fetched:", data.products);
  //       setProducts(data.products);
  //     } catch (err) {
  //       console.error("Failed to fetch products:", err);
  //       setError("Failed to fetch products");
  //     }
  //   };

  //   const userRole = localStorage.getItem("role");
  //   console.log("User role:", userRole);
  //   if (!userRole) {
  //     console.log("No role found, redirecting");
  //     window.location.href = "/auth/login";
  //   } else {
  //     setRole(userRole);
  //     fetchProducts();
  //   }
  // }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");
    const userToken = localStorage.getItem("token");

    setCurrentUserEmail(userEmail);
    setRole(userRole);

    const fetchProducts = async () => {
      setLoading(true);
      if (!userRole) {
        console.log("No role found, redirecting to login");
        router.push("/auth/login");
      } else {
        try {
          const { data } = await axios.get(`${baseUrl}/api/products`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          console.log("Products fetched:", data.products);
          setProducts(data.products);
        } catch (err) {
          console.error("Failed to fetch products:", err);
          setError("Failed to fetch products");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome, {role.toUpperCase()}
              </h1>
              <p className="text-lg text-gray-600">Email: {currentUserEmail}</p>
            </div>
            <button
              onClick={() => router.push("/reviewChanges")}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {role === "admin"
                ? "View Pending Requests"
                : "View Request Status"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover object-center"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-indigo-600 mb-4">
                    ${product.price}
                  </p>
                  <Link href={`/product/${product._id}`}>
                    <span className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                      Edit Product
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
