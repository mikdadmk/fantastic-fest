"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaTrophy, FaCalendarAlt, FaUserCheck, FaEnvelope } from "react-icons/fa"; // Import icons

const DashboardPage = () => (
  <section className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl"
    >
      <h2 className="text-4xl font-bold text-center mb-8 font-poppins">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/">
          <div className="bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaHome className="text-3xl mb-3" />
            Home
          </div>
        </Link>
        <Link href="/result">
          <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaTrophy className="text-3xl mb-3" />
            Result
          </div>
        </Link>
        <Link href="/top-performers">
          <div className="bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaTrophy className="text-3xl mb-3" />
            Toppers
          </div>
        </Link>
        <Link href="/programmes">
          <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaCalendarAlt className="text-3xl mb-3" />
            Programmes
          </div>
        </Link>
        <Link href="/profilecheck">
          <div className="bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-600 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaUserCheck className="text-3xl mb-3" />
            Profile Check
          </div>
        </Link>
        <Link href="/contactus">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-white text-lg font-semibold md:h-60 h-40 md:w-60">
            <FaEnvelope className="text-3xl mb-3" />
            Contact
          </div>
        </Link>
      </div>
    </motion.div>
  </section>
);

export default DashboardPage;
