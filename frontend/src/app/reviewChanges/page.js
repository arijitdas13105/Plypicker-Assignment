"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const ChangesReview = () => {
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState("");
  const router = useRouter();
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  // const currentUserEmail = localStorage.getItem("email");
  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("email");
      setCurrentUserEmail(userEmail);
      
      const userRole = localStorage.getItem("role");
      setRole(userRole);
      if (userRole) {
        fetchReviews(userRole);
      }
    }
  }, []);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const endpoint =
  //       role === "admin"
  //         ?  `${baseUrl}/api/products/reviews/all`
  //         :  `${baseUrl}/api/products/reviews/myReview`;

  //     try {
  //       const { data } = await axios.get(endpoint, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       console.log("bakjbddata", data);
  //       setReviews(data.reviews);
  //     } catch (error) {
  //       console.error("Failed to fetch reviews:", error);
  //     }
  //   };

  //   const userRole = localStorage.getItem("role");
  //   setRole(userRole);
  //   if (userRole) {
  //     fetchReviews();
  //   }
  // }, [role]);


  const fetchReviews = async (role) => {
    const endpoint =
      role === "admin"
        ? `${baseUrl}/api/products/reviews/all`
        : `${baseUrl}/api/products/reviews/myReview`;

    try {
      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Retrieved data", data);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    if (role) {
      fetchReviews(role);
    }
  }, [role]);


  const updateReviewStatus = async (reviewId, status) => {
    try {
      await axios.put(
        `${baseUrl}/api/products/reviews/${reviewId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`Review ${status} successfully`);
      fetchReviews();
    } catch (error) {
      alert("Failed to update review status");
      console.error("Error updating review:", error);
    }
  };
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="px-28 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        {role === "admin" ? "Pending Reviews" : "My Submission Status"}
      </h1>

      <button
        onClick={handleBackClick}
        className="mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 hover:scale-105"
      >
        Back
      </button>
      {/* <ul className="space-y-8">
        {reviews.map((review) => (
          <li
            key={review._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg">
              <img
                src={review.details.image}
                alt={review?.product?.name}
                className="w-52 h-52 object-cover object-center"
              />
            </div>

            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 underline decoration-purple-500 decoration-2">
                  {review.product.name}
                </h2>
                <div className="mt-2 text-lg text-gray-800 space-y-3">
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Name:
                    </strong>{" "}
                    <span className="text-gray-900">{review.details.name}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Description:
                    </strong>{" "}
                    <span className="text-gray-900">{review.details.description}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700 ">
                      Price:
                    </strong>{" "}
                    <span className="text-green-900 text-xl font-extrabold">₹{review.details.price}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Status:
                    </strong>{" "}
                    <span
                      className={`${
                        review.status === "pending"
                          ? "text-yellow-600"
                          : review.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-extrabold bg-purple-100 rounded-lg px-2 py-1`}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-lg text-gray-800">
                <p>
                  <strong className="font-semibold text-purple-700">
                    Comment:
                  </strong>{" "}
                  <span className="text-gray-900">{review.comments}</span>
                </p>
              </div>
              <div className="mt-4 text-lg text-gray-800">
                <p>
                  <strong className="font-semibold text-purple-700">
                    Changes By:
                  </strong>{" "}
                  <span className="text-gray-900 text-[#3e639e] text-lg font-bold">
                  
                  {role==='admin'?review.author.email:'Self'}

                  
                  </span>
                </p>
              </div>

              {role === "admin" && review.status === "pending" && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => updateReviewStatus(review._id, "approved")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateReviewStatus(review._id, "rejected")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul> */}
<ul className="space-y-8">
  {reviews.map((review) => (
    <li
      key={review._id}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg">
        {/* Ensure the image URL is available */}
        {review.details.image && (
          <img
            src={review.details.image}
            alt={review.product?.name || 'Product Image'}
            className="w-52 h-52 object-cover object-center"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between w-full">
        {review.product ? (
          <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 underline decoration-purple-500 decoration-2">
                  {review.product.name}
                </h2>
                <div className="mt-2 text-lg text-gray-800 space-y-3">
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Name:
                    </strong>{" "}
                    <span className="text-gray-900">{review.details.name}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Description:
                    </strong>{" "}
                    <span className="text-gray-900">{review.details.description}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700 ">
                      Price:
                    </strong>{" "}
                    <span className="text-green-900 text-xl font-extrabold">₹{review.details.price}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-purple-700">
                      Status:
                    </strong>{" "}
                    <span
                      className={`${
                        review.status === "pending"
                          ? "text-yellow-600"
                          : review.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-extrabold bg-purple-100 rounded-lg px-2 py-1`}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-lg text-gray-800">
                <p>
                  <strong className="font-semibold text-purple-700">
                    Comment:
                  </strong>{" "}
                  <span className="text-gray-900">{review.comments}</span>
                </p>
              </div>
              <div className="mt-4 text-lg text-gray-800">
                <p>
                  <strong className="font-semibold text-purple-700">
                    Changes By:
                  </strong>{" "}
                  <span className="text-gray-900 text-[#3e639e] text-lg font-bold">
                  
                  {role==='admin'?review.author.email:'Self'}

                  
                  </span>
                </p>
              </div>

              {role === "admin" && review.status === "pending" && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => updateReviewStatus(review._id, "approved")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateReviewStatus(review._id, "rejected")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Product information is unavailable.</p>
          </div>
        )}
        {/* Remaining component code */}
      </div>
    </li>
  ))}
</ul>

      <button
        onClick={handleBackClick}
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 hover:scale-105"
      >
        Back
      </button>
    </div>
  );
};

export default ChangesReview;

