// hooks/useProduct.js

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { storage } from "../firebase"; // Adjust the import path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import getCroppedImg from "../utils/cropImage"; // A utility function to crop the image
import { baseUrl } from "../utils/baseUrl";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [userRole, setUserRole] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
      setCurrentUserEmail(localStorage.getItem("email"));
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await axios.get(`${baseUrl}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Product fetched:", data.product);
        setProduct(data.product);
        setFormData({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          image: data.product.image,
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const onChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setCroppedImageUrl(reader.result); // Preview the image for cropping
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageFile) return;

    try {
      const croppedImage = await getCroppedImg(
        croppedImageUrl,
        croppedAreaPixels
      );
      const croppedImageBlob = await fetch(croppedImage).then((res) =>
        res.blob()
      );

      const fileName = uuidv4();
      const croppedImageFile = new File(
        [croppedImageBlob],
        `${fileName}.jpeg`,
        { type: "image/jpeg" }
      );

      return croppedImageFile;
    } catch (error) {
      console.error("Error cropping image", error);
    }
  };

  const handleImageUpload = async () => {
    const croppedImageFile = await handleCrop();

    if (!croppedImageFile) return formData.image; // Return the existing image if no new image is cropped

    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `products/${croppedImageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, croppedImageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);

          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    if (userRole === "admin") {
      try {
        await axios.put(
          `${baseUrl}/api/products/${product._id}`,
          { ...formData, image: imageUrl },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Product updated successfully!");
        router.push("/dashboard");
      } catch (error) {
        alert("Failed to update product");
      }
    } else {
      const reviewData = {
        product: product._id,
        details: {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          image: imageUrl,
        },
        comments: "Proposed changes for review",
      };
      try {
        await axios.post(
          `${baseUrl}/api/products/reviews/createReview`,
          reviewData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Review submitted successfully!");
        router.push("/dashboard");
      } catch (error) {
        alert("Failed to submit review");
      }
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return {
    product,
    loading,
    error,
    formData,
    uploadProgress,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImageUrl,
    userRole,
    currentUserEmail,
    onChange,
    onCropComplete,
    handleSubmit,
    handleBackClick,
  };
};
