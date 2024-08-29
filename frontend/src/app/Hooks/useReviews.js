// hooks/reviewHooks.js

import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from '../utils/baseUrl';

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

  const fetchReviews = async (role) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

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
      fetchReviews(role);
    } catch (error) {
      alert("Failed to update review status");
      console.error("Error updating review:", error);
    }
  };

  return {
    reviews,
    role,
    currentUserEmail,
    loading,
    fetchReviews,
    updateReviewStatus,
  };
};
