// "use client";

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// const ProductForm = ({ product }) => {
//     const router = useRouter();
//     const userRole = localStorage.getItem('role');
//     const [formData, setFormData] = useState({
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         image: product.image
//     });

//     const { name, description, price, image } = formData;
//     const onChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (userRole === 'admin') {
//             // Admin updates the product directly
//             try {
//                 await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 alert('Product updated successfully!');
//                 router.push('/dashboard');
//             } catch (error) {
//                 alert('Failed to update product');
//             }
//         } else {
//             // Team member submits a review
//             const reviewData = {
//                 product: product._id,
//                 details: {
//                     name,
//                     description,
//                     price,
//                     image
//                 },
//                 comments: "Proposed changes for review" // Optional, could be extended to include user input
//             };
//             try {
//                 await axios.post('http://localhost:5000/api/products/reviews/createReview', reviewData, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 alert('Review submitted successfully!');
//                 router.push('/dashboard');
//             } catch (error) {
//                 alert('Failed to submit review');
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                     Product Name
//                 </label>
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Product Name" name="name" value={name} onChange={onChange} />
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                     Description
//                 </label>
//                 <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Product Description" name="description" value={description} onChange={onChange}></textarea>
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                     Price
//                 </label>
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" name="price" value={price} onChange={onChange} />
//             </div>
//             <div className="flex items-center justify-between">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                     {userRole === 'admin' ? 'Update Product' : 'Submit Changes for Approval'}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default ProductForm;

//----------------------------

// "use client";

// import React, { useState,useRef } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { storage } from '../firebase'  // Adjust the import path as needed
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// const ProductForm = ({ product }) => {
//     const router = useRouter();
//     const userRole = localStorage.getItem('role');
//     const [formData, setFormData] = useState({
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         image: product.image
//     });

//     const [imageFile, setImageFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);

//     const [src, setSrc] = useState(null);
//     const [crop, setCrop] = useState({ aspect: 1 });
//     const [croppedImageUrl, setCroppedImageUrl] = useState(null);
//     const [croppedImage, setCroppedImage] = useState(null);
//     const imageRef = useRef(null);

//     const { name, description, price, image } = formData;

//     const onChange = (e) => {
//         if (e.target.name === 'image') {
//             setImageFile(e.target.files[0]); // Store the selected file
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     const handleImageUpload = async () => {
//         return new Promise((resolve, reject) => {
//             if (!imageFile) return resolve(image);  // If no new image is selected, resolve with current image URL

//             const storageRef = ref(storage, `products/${imageFile.name}`);
//             const uploadTask = uploadBytesResumable(storageRef, imageFile);

//             uploadTask.on('state_changed',
//                 (snapshot) => {
//                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     setUploadProgress(progress);
//                     console.log('Upload is ' + progress + '% done');
//                 },
//                 (error) => {
//                     console.error('Upload failed', error);
//                     reject(error);
//                 },
//                 () => {
//                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                         console.log('File available at', downloadURL);
//                         resolve(downloadURL);
//                     });
//                 }
//             );
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const imageUrl = await handleImageUpload();

//         if (userRole === 'admin') {
//             // Admin updates the product directly
//             try {
//                 await axios.put(`http://localhost:5000/api/products/${product._id}`, { ...formData, image: imageUrl }, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 alert('Product updated successfully!');
//                 router.push('/dashboard');
//             } catch (error) {
//                 alert('Failed to update product');
//             }
//         } else {
//             // Team member submits a review
//             const reviewData = {
//                 product: product._id,
//                 details: {
//                     name,
//                     description,
//                     price,
//                     image: imageUrl
//                 },
//                 comments: "Proposed changes for review"
//             };
//             try {
//                 await axios.post('http://localhost:5000/api/products/reviews/createReview', reviewData, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 alert('Review submitted successfully!');
//                 router.push('/dashboard');
//             } catch (error) {
//                 alert('Failed to submit review');
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                     Product Name
//                 </label>
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Product Name" name="name" value={name} onChange={onChange} />
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                     Description
//                 </label>
//                 <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Product Description" name="description" value={description} onChange={onChange}></textarea>
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                     Price
//                 </label>
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" name="price" value={price} onChange={onChange} />
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                     Product Image
//                 </label>
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" name="image" onChange={onChange} />
//                 {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//             </div>
//             <div className="flex items-center justify-between">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                     {userRole === 'admin' ? 'Update Product' : 'Submit Changes for Approval'}
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default ProductForm;

//---------asli-upore----------

// "use client";

// import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { storage } from "../firebase"; // Adjust the import path as needed
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import Cropper from "react-easy-crop";
// import { v4 as uuidv4 } from "uuid";
// import getCroppedImg from "../utils/cropImage"; // A utility function to crop the image

// const ProductForm = ({ product }) => {
//   const router = useRouter();
//   const userRole = localStorage.getItem("role");

//   const [formData, setFormData] = useState({
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     image: product.image,
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImageUrl, setCroppedImageUrl] = useState("");

//   const { name, description, price, image } = formData;

//   const handleBackClick = () => {
//     router.back();
//   };
//   const onChange = (e) => {
//     if (e.target.name === "image") {
//       const file = e.target.files[0];
//       if (file) {
//         setImageFile(file);
//         const reader = new FileReader();
//         reader.onload = () => {
//           setCroppedImageUrl(reader.result); // Preview the image for cropping
//         };
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCrop = async () => {
//     if (!imageFile) return;

//     try {
//       const croppedImage = await getCroppedImg(croppedImageUrl, croppedAreaPixels);
//       const croppedImageBlob = await fetch(croppedImage).then((res) => res.blob());

//       const fileName = uuidv4();
//       const croppedImageFile = new File([croppedImageBlob], `${fileName}.jpeg`, { type: "image/jpeg" });

//       return croppedImageFile;
//     } catch (error) {
//       console.error("Error cropping image", error);
//     }
//   };

//   const handleImageUpload = async () => {
//     const croppedImageFile = await handleCrop();

//     if (!croppedImageFile) return image; // If no new image was cropped, return the existing image

//     return new Promise((resolve, reject) => {
//       const storageRef = ref(storage, `products/${croppedImageFile.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, croppedImageFile);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadProgress(progress);
//           console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           console.error("Upload failed", error);
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             console.log("File available at", downloadURL);
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const imageUrl = await handleImageUpload();

//     if (userRole === "admin") {
//       try {
//         await axios.put(
//           `http://localhost:5000/api/products/${product._id}`,
//           { ...formData, image: imageUrl },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         alert("Product updated successfully!");
//         router.push("/dashboard");
//       } catch (error) {
//         alert("Failed to update product");
//       }
//     } else {
//       const reviewData = {
//         product: product._id,
//         details: {
//           name,
//           description,
//           price,
//           image: imageUrl,
//         },
//         comments: "Proposed changes for review",
//       };
//       try {
//         await axios.post("http://localhost:5000/api/products/reviews/createReview", reviewData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         });
//         alert("Review submitted successfully!");
//         router.push("/dashboard");
//       } catch (error) {
//         alert("Failed to submit review");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//           Product Name
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           placeholder="Product Name"
//           name="name"
//           value={name}
//           onChange={onChange}
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//           Description
//         </label>
//         <textarea
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//           id="description"
//           placeholder="Product Description"
//           name="description"
//           value={description}
//           onChange={onChange}
//         ></textarea>
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//           Price
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="price"
//           type="number"
//           placeholder="Price"
//           name="price"
//           value={price}
//           onChange={onChange}
//         />
//       </div>
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//           Product Image
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="image"
//           type="file"
//           name="image"
//           onChange={onChange}
//         />
//         {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//         {croppedImageUrl && (
//           <div style={{ position: "relative", width: "100%", height: 400 }}>
//             <Cropper
//               image={croppedImageUrl}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//           </div>
//         )}
//       </div>
//       <div className="flex items-center justify-between">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           {userRole === "admin" ? "Update Product" : "Submit Changes for Approval"}
//         </button>

//       </div>
//       <button
//       type="button"
//         onClick={handleBackClick}
//         className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 hover:scale-105"
//       >
//         Back
//       </button>
//     </form>
//   );
// };

// export default ProductForm;

//-----------------
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { storage } from "../firebase"; // Adjust the import path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Cropper from "react-easy-crop";
import { v4 as uuidv4 } from "uuid";
import getCroppedImg from "../utils/cropImage"; // A utility function to crop the image

const ProductForm = ({ product }) => {
  const router = useRouter();
  const userRole = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const { name, description, price, image } = formData;

  const handleBackClick = () => {
    router.back();
  };

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

  // const handleImageUpload = async () => {
  //   const croppedImageFile = await handleCrop();

  //   if (!croppedImageFile) return image; // If no new image was cropped, return the existing image

  //   return new Promise((resolve, reject) => {
  //     const storageRef = ref(storage, `products/${croppedImageFile.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, croppedImageFile);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         setUploadProgress(progress);
  //         console.log("Upload is " + progress + "% done");
  //       },
  //       (error) => {
  //         console.error("Upload failed", error);
  //         reject(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log("File available at", downloadURL);
  //           resolve(downloadURL);
  //         });
  //       }
  //     );
  //   });
  // };


  const handleImageUpload = async () => {
    const croppedImageFile = await handleCrop();
  
    if (!croppedImageFile) return image; // If no new image was cropped, return the existing image
  
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `products/${croppedImageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, croppedImageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Calculate the progress as a percentage
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); // Update state to reflect progress
  
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
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
          `http://localhost:5000/api/products/${product._id}`,
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
          name,
          description,
          price,
          image: imageUrl,
        },
        comments: "Proposed changes for review",
      };
      try {
        await axios.post(
          "http://localhost:5000/api/products/reviews/createReview",
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
        {/* {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden">
              <div
                className="bg-blue-500 h-full text-xs flex items-center justify-center text-white"
                style={{
                  width: `${uploadProgress}%`,
                  transition: "width 0.5s ease-in-out",
                }}
              >
                <span className="absolute right-2 text-sm font-semibold">
                  {uploadProgress.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )} */}

        {uploadProgress > 0 && (
  <div className="mt-4">
    <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden">
      <div
        className="bg-blue-500 h-full text-xs flex items-center justify-center text-white"
        style={{ width: `${uploadProgress}%`, transition: "width 0.3s ease-in-out" }}
      >
        <span className="absolute right-2 text-sm font-semibold">{uploadProgress.toFixed(2)}%</span>
      </div>
    </div>
  </div>
)}

        {croppedImageUrl && (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={croppedImageUrl}
              crop={crop}
              zoom={zoom}
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
