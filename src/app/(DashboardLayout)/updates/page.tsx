"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Button, TextField, CircularProgress } from "@mui/material";

interface MarklistItem {
  _id: string;
  name: string;
  image?: string; // Optional, since it might not exist for all documents
}

const ManageImages: React.FC = () => {
  const [marklist, setMarklist] = useState<MarklistItem[]>([]);
  const [filteredMarklist, setFilteredMarklist] = useState<MarklistItem[]>([]);
  const [newImageLink, setNewImageLink] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch marklist data from the database
  const fetchMarklist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/marklistimage");
      if (!response.ok) {
        throw new Error("Failed to fetch marklist data");
      }
      const data: MarklistItem[] = await response.json();
      setMarklist(data);
      setFilteredMarklist(data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching marklist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update the image link in the database
  const updateImageLink = async (id: string) => {
    if (!newImageLink.trim()) {
      alert("Please enter a valid image link.");
      return;
    }

    try {
      const response = await fetch(`/api/marklistimage/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: newImageLink }),
      });

      if (response.ok) {
        alert("Image updated successfully");
        setNewImageLink(""); // Clear the input
        fetchMarklist(); // Refresh data
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Filter the marklist based on the search term
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = marklist.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMarklist(filtered);
  };

  useEffect(() => {
    fetchMarklist();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-6 lg:p-8">
      <Typography variant="h5" gutterBottom className="text-center text-gray-800">
        Manage Images
      </Typography>

      {/* Search Input */}
      <div className="mb-4 ">
        <TextField
          label="Search by Name"
          fullWidth
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type to filter items..."
        />
      </div>

      {/* Image Management Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {filteredMarklist.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Typography variant="h6" className="text-lg font-medium text-gray-800">{item.name}</Typography>
            <motion.img
              src={item.image || "/default-avatar.png"} // Default image if none exists
              alt={item.name}
              className="rounded-full w-24 h-24 object-cover mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <TextField
              label="New Image Link"
              fullWidth
              size="small"
              variant="outlined"
              value={selectedId === item._id ? newImageLink : ""}
              onChange={(e) => {
                setSelectedId(item._id);
                setNewImageLink(e.target.value);
              }}
              className="mt-2"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={() => updateImageLink(item._id)}
            >
              Update Image
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageImages;
