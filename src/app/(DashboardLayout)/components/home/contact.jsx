"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been sent!");
        setFormData({ username: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to send the message.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="h-screen w-full bg-gradient-to-r from-green-500 to-teal-600 flex flex-col items-center justify-center text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center w-full max-w-md"
      >
        <h2 className="text-4xl font-bold mb-4">Get Involved</h2>
        <p className="text-lg md:text-xl mb-6">Share your valuable message to be part of this amazing journey!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-3 rounded-lg text-teal-600"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg text-teal-600"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="w-full p-3 rounded-lg text-teal-600"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-white text-teal-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactPage;
