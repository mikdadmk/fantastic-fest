"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function ProfileCheck() {
  const [chestNumber, setChestNumber] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!chestNumber) {
      setError("Please enter a chest number.");
      return;
    }

    setLoading(true);
    setError(null);
    setData([]);

    try {
      // Fetch studentslist API for images
      const studentslistResponse = await fetch("/api/studentslist");
      if (!studentslistResponse.ok) {
        throw new Error("Failed to fetch student images.");
      }
      const studentslist = await studentslistResponse.json();

      // Find the student image by chest number
      const student = studentslist.find(
        (item) => item.chestNumber === chestNumber
      );

      // Fetch marklist API for programme details
      const marklistResponse = await fetch("/api/marklist");
      if (!marklistResponse.ok) {
        throw new Error("Failed to fetch marklist.");
      }
      const marklist = await marklistResponse.json();

      // Filter marklist data for the chest number
      const filteredData = marklist.filter(
        (item) => item.chestNumber === chestNumber
      );

      if (filteredData.length === 0) {
        setError("No records found for this chest number.");
      } else {
        // Add the image to each record
        setData(
          filteredData.map((item) => ({
            ...item,
            image: student?.image || null,
          }))
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <Link href="/result" passHref>
          <IconButton component="a" sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profile Check
        </motion.h1>

        <div className="mb-6">
          <input
            type="text"
            value={chestNumber}
            onChange={(e) => setChestNumber(e.target.value)}
            placeholder="Enter Chest Number"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-500"
          >
            {error}
          </motion.p>
        )}

        {data.length > 0 && (
          <motion.div
            className="mt-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-gray-100 p-4 rounded-lg shadow space-x-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${item.name}'s profile`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-700">
                    <strong>Programme:</strong> {item.programme}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Position:</strong> {item.position}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Team:</strong> {item.team}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
