"use client";

import { motion } from "framer-motion";

const AboutPage = () => (
  <section className="h-[70vh] w-full bg-white flex flex-col items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl text-center"
    >
      <h2 className="text-4xl font-bold mb-4 font-poppins">About the Festival</h2>
      <p className="text-lg md:text-xl text-gray-600">
        Join us for an incredible celebration of art, culture, and festivity. Discover amazing performances, exhibitions, and workshops curated for all ages.
      </p>
    </motion.div>
  </section>
);

export default AboutPage;
