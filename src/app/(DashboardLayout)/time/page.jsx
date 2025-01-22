"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    programmeName: "",
    time: "",
    date: "",
    stage: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  // Fetch all schedules
  const fetchSchedules = async () => {
    try {
      const response = await fetch("/api/schedule", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      } else {
        console.error("Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchSchedules(); // Refresh schedules after adding
        setFormData({ programmeName: "", time: "", date: "", stage: "" }); // Reset form
        setIsFormVisible(false); // Hide the form after submission
      } else {
        console.error("Failed to add schedule");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/schedule", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchSchedules(); // Refresh schedules after deletion
      } else {
        console.error("Failed to delete schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="relative min-h-screen bg-white p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Time Schedule</h1>

      {/* Display list of schedules */}
      <ul className="space-y-4">
        {schedules.map((schedule) => (
          <motion.li
            key={schedule._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100"
          >
            <div>
              <p className="font-bold text-gray-900">{schedule.programmeName}</p>
              <p className="text-gray-600">
                {schedule.time} | {schedule.date} | {schedule.stage}
              </p>
            </div>
            <button
              onClick={() => handleDelete(schedule._id)}
              className="btn bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Delete
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Add Button */}
      <motion.button
        onClick={() => setIsFormVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        whileHover={{ scale: 1.1 }}
      >
        Add
      </motion.button>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">Add Schedule</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Programme Name"
                  value={formData.programmeName}
                  onChange={(e) => setFormData({ ...formData, programmeName: e.target.value })}
                  required
                  className="input w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  className="input w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="input w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Stage"
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  required
                  className="input w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    className="btn bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}