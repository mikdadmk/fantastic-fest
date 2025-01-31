"use client";

import { motion } from "framer-motion";

const AboutPage = () => (
  <section className="h-[70vh] w-full bg-white flex flex-col items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl text-center font-poppins"
    >
      <h2 className="text-4xl font-bold mb-4">About the Fest</h2>
      <p className="text-lg md:text-xl text-gray-600">
      Welcome to Fantastic 2k25, the premier arts and sports fest at Islamic Da'wa Academy! 
      This annual event is dedicated to upskilling the talents of our exceptional Huffaz, 
      who have memorized the Quran. Fantastic 2k25 features a diverse array of Islamic competitions. Join us in celebrating the rich
      tapestry of Islamic arts and sports, as we foster creativity, knowledge, and excellence in our vibrant student community.
      </p>
    </motion.div>
  </section>
);

export default AboutPage;
