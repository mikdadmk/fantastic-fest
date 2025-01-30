"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back icon
import Image from "next/image"; // Import the Image component from next/image
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

// Image Type
interface Image {
  id: string;
  url: string;
  title: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter(); // Hook for navigating

  // Fetch images from the backend
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/galleryimages?folder=gallery`);
      const data: Image[] = await res.json();
      if (data && data.length > 0) {
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gray-50"
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Navigate back
        className="absolute top-5 left-4 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all"
      >
        <ArrowBackIcon />
      </button>

      <h2 className="text-3xl font-extrabold text-center text-gray-800  mb-12">
        Complete Gallery
      </h2>

      {loading ? (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-lg text-center text-gray-600">
          No images found in the gallery.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image.url)} // Set selected image on click
              className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 transform ${
                selectedImage === image.url ? "scale-105 border-4 border-orange-500" : ""
              }`}
            >
              <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio container */}
                <Image
                  src={image.url}
                  alt={image.title || "Gallery image"} // Fallback if title is missing
                  layout="fill"
                  objectFit="cover" // Ensures proper image scaling
                  className="w-full h-full rounded-t-xl"
                />
              </div>
              <motion.div
                whileHover={{ opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 opacity-0 text-center transition-all"
              >
                <p className="text-lg font-medium">{image.title}</p>
              </motion.div>
              <button
                className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onClick for selecting image
                  window.open(image.url, "_blank");
                }}
              >
                <DownloadIcon />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default GalleryPage;
