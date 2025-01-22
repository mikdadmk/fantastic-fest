'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

interface ImageData {
  id: string;
  url: string;
  title: string;
  description: string;
}

const DynamicImageSlider = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/sliding');

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
      <div className="text-center mt-12 ">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 mx-auto mb-4"></div>
        <p className="text-lg font-medium">Loading Images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12">
        <p className="text-lg font-medium text-red-600">Failed to load images. Please try again later.</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={fetchImages}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="text-center mt-12">
        <p className="text-lg font-medium">No images found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Fest Controllers</h2>

      <Swiper
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="flex flex-col items-center rounded-lg p-4 mb-4">
              <div className="relative w-full h-64">
                <Image
                  src={image.url}
                  alt={image.title || 'Image'}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-black text-lg font-semibold mt-4 text-center">
                {image.title || 'Default Title'}
              </h3>
              <p className="text-gray-700 italic mt-2 text-center">
                {image.description || 'No description available.'}
              </p>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-next-custom text-black hover:text-gray-500"></div>
        <div className="swiper-button-prev-custom text-black hover:text-gray-500"></div>
      </Swiper>
    </div>
  );
};

export default DynamicImageSlider;
