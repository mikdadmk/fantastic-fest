'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageData {
  id: string;
  url: string;
  title: string;
  description: string;
}

const CircularImageSlider = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/leaders');

      if (!response.ok) {
        console.error(`Failed to fetch images: ${response.statusText}`);
        setError(true);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error('Invalid data format:', data);
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 mb-4"></div>
        <p className="text-lg font-medium">Loading Images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-red-600">Failed to load images. Please try again later.</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={fetchImages}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium">No images found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8 bg-gray-100 my-16">
      {/* Heading */}
      <motion.h1
        className="text-3xl font-bold    bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Fest Team Leaders
      </motion.h1>

      {/* Circular Image Container */}
      <div className="relative w-64 h-64 lg:w-72 lg:h-72 bg-white rounded-full shadow-lg overflow-hidden flex items-center justify-center">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          slidesPerView={1}
          className="w-full h-full"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={image.url}
                  alt={image.title || 'Image'}
                  fill
                  className="object-cover rounded-full"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Title & Description */}
      <div className="w-full text-center px-4">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h3 className="text-xl font-semibold text-gray-800">{image.title || 'Title Unavailable'}</h3>
                <p className="text-gray-600 mt-2 text-sm">{image.description || 'No description available.'}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CircularImageSlider;
