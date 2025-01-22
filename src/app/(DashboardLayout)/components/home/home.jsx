"use client";
// In your main file (e.g., _app.js or layout.js)
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for navigation

const WelcomePage = () => {
  useEffect(() => {
    let timeoutId; // Variable to hold the timeout ID for debounce

    const createCircle = (e) => {
      // Predefined set of colors
      const colors = [
        "rgba(255, 99, 132, 0.6)", // Red
        "rgba(54, 162, 235, 0.6)", // Blue
        "rgba(255, 159, 64, 0.6)", // Orange
        "rgba(75, 192, 192, 0.6)", // Green
        "rgba(153, 102, 255, 0.6)", // Purple
        "rgba(255, 205, 86, 0.6)", // Yellow
      ];

      // Select a random color from the colors array
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Create a new circle element
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.backgroundColor = randomColor;

      // Set the position based on mouse coordinates
      circle.style.left = `${e.pageX - 25}px`;
      circle.style.top = `${e.pageY - 25}px`;

      // Append the circle to the body
      document.body.appendChild(circle);

      // Remove the circle after animation
      setTimeout(() => {
        circle.remove();
      }, 1000); // Circle disappears after 1 second
    };

    const handleMouseMove = (e) => {
      // Reset the timeout on each mouse move to restart the debounce
      clearTimeout(timeoutId);
      createCircle(e);

      // Set a timeout to stop creating circles if mouse stops moving
      timeoutId = setTimeout(() => {
        // Optionally: Do something when mouse stops moving, e.g., log a message or stop animations
      }, 200); // Set the debounce time (in milliseconds)
    };

    // Add event listener to capture mousemove
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId); // Clean up timeout on unmount
    };
  }, []);

  return (
    <section className="h-screen w-full bg-gradient-to-br from-purple-500 to-indigo-600 flex  flex-col items-center justify-center text-white text-center">
      {/* Arts & Fest Icons in the background */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-20 hidden md:block">
        <i className="fas fa-headphones-alt text-8xl"></i>
      </div>
      <div className="absolute top-1/4 right-20 opacity-30">
        <i className="fas fa-palette text-6xl"></i>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-20 hidden md:block">
        <i className="fas fa-microphone-alt text-7xl"></i>
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-20 hidden md:block">
      <i className="fas fa-music text-7xl"></i>
      </div>
      <div className="absolute bottom-20 left-20 opacity-30">
        <i className="fas fa-guitar text-6xl"></i>
      </div>
      <div className="absolute bottom-10 right-10 opacity-30">
        <i className="fas fa-camera-retro text-6xl"></i>
      </div>

      {/* Logo in top-left corner */}
      <div className="absolute top-5 left-5  w-20 h-20 md:top-[4rem] md:left-[4rem] bg-white p-2 flex items-center justify-center rounded-full shadow-lg">
        <img
          src="https://res.cloudinary.com/dhksqekbo/image/upload/v1737868178/fantastic-logo_aqa6bo.png"
          alt="fantastic-logo"
          className="w-full h-full object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-medium font-aesthetic">
          Fantastic 2k25 Arts & Fest
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-poppins">
          Experience creativity and culture like never before!
        </p>
      </motion.div>

      <motion.img
        src="https://res.cloudinary.com/dhksqekbo/image/upload/v1737868178/fantastic-logo_aqa6bo.png"
        alt="fantastic-logo"
        className="w-1/2 md:w-1/4 lg:w-1/4 h-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* "Check Result" button as a link */}
      <div className="mt-10">
        <Link href="/result" passHref>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="px-6 sm:px-8 md:px-12 py-2 sm:py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg "
          >
            Check Result
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default WelcomePage;
