"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MarkList = () => {
  const [marklist, setMarklist] = useState([]);
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [showGeneralForm, setShowGeneralForm] = useState(false);
  const [itemType, setItemType] = useState("sports");
  const [filter, setFilter] = useState({
    programme: "",
    type: "",
    item: "",
  });

  useEffect(() => {
    fetchMarklist();
  }, []);

  const fetchMarklist = async () => {
    try {
      const res = await fetch("/api/marklist");
      const data = await res.json();

      const sortedData = data.sort((a, b) =>
        a.programme.localeCompare(b.programme)
      );

      setMarklist(sortedData);
    } catch (error) {
      console.error("Error fetching marklist:", error);
      alert("Failed to fetch the mark list.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        const res = await fetch("/api/marklist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id }),
        });
        if (res.ok) {
          fetchMarklist();
        } else {
          alert("Failed to delete the entry.");
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    const method = "POST";
    const endpoint = "/api/marklist";

    if (formType === "individual") {
      updatedData.type = "individual";
    } else if (formType === "general") {
      updatedData.type = "general";
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setShowIndividualForm(false);
        setShowGeneralForm(false);
        fetchMarklist();
      } else {
        alert("Failed to save the entry.");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Filter marklist based on selected filters
  const filteredMarklist = marklist.filter((item) => {
    return (
      (filter.programme === "" || item.programme === filter.programme) &&
      (filter.type === "" || item.type === filter.type) &&
      (filter.item === "" || item.item === filter.item)
    );
  });

  return (
    <div className="p-4 relative min-h-screen">
      <h1 className="text-xl font-bold mb-4">Mark List</h1>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 bg-white p-4 rounded-lg shadow-lg"
      >
        <div className="flex space-x-4">
          <select
            value={filter.programme}
            onChange={(e) => setFilter({ ...filter, programme: e.target.value })}
            className="border p-2 w-1/3"
          >
            <option value="">All Programmes</option>
            <option value="Running">Running</option>
            <option value="Relay">Relay</option>
            <option value="Javelin">Javelin</option>
            <option value="Jumping">Jumping</option>
            <option value="Essay">Essay</option>
            <option value="Speech">Speech</option>
            <option value="Reading">Reading</option>
            <option value="Quiz">Quiz</option>
          </select>

          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="border p-2 w-1/3"
          >
            <option value="">All Types</option>
            <option value="individual">Individual</option>
            <option value="general">General</option>
          </select>

          <select
            value={filter.item}
            onChange={(e) => setFilter({ ...filter, item: e.target.value })}
            className="border p-2 w-1/3"
          >
            <option value="">All Items</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
          </select>
        </div>
      </motion.div>

      {/* Mark List */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {filteredMarklist.map((item) => (
          <motion.li
            key={item._id}
            className="border-b py-2 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p>
                Programme: <strong>{item.programme}</strong>
              </p>

              {/* Only show Name, Chest Number, and Category for individual items */}
              {item.type === "individual" && (
                <>
                  <p>Name: {item.name}</p>
                  <p>Chest Number: {item.chestNumber}</p>
                  <p>Team: {item.team}</p>
                  <p>Category: {item.category}</p>
                </>
              )}

              {/* Show Team only for general items */}
              {item.type === "general" && <p>Team: {item.team}</p>}

              <p>
                Position: <strong>{item.position}</strong>
              </p>
              <p>Mark: {item.mark}</p>
              <p>Type: {item.type}</p>
              <p>Item: {item.item}</p>
            </div>

            <div>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        onClick={() => setShowIndividualForm(!showIndividualForm)}
        className="fixed bottom-20 right-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Add Individual
      </motion.button>

      <motion.button
        onClick={() => setShowGeneralForm(!showGeneralForm)}
        className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Add General
      </motion.button>

      {showIndividualForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
          <motion.form
            onSubmit={(e) => handleSubmit(e, "individual")}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold mb-4">Add Individual Mark</h2>
            <label className="block mb-2">
              Item:
              <select
                name="item"
                value={itemType}
                onChange={handleItemTypeChange}
                className="border w-full p-2"
              >
                <option value="sports">Sports</option>
                <option value="arts">Arts</option>
              </select>
            </label>
            <label className="block mb-2">
              Programme:
              <select name="programme" className="border w-full p-2">
                <option value="">Select a programme</option>
                {itemType === "sports" && (
                  <>
                    <option value="Running">Running</option>
                    <option value="Relay">Relay</option>
                    <option value="Javelin">Javelin</option>
                    <option value="Jumping">Jumping</option>
                  </>
                )}
                {itemType === "arts" && (
                  <>
                    <option value="Essay">Essay</option>
                    <option value="Speech">Speech</option>
                    <option value="Reading">Reading</option>
                    <option value="Quiz">Quiz</option>
                  </>
                )}
              </select>
            </label>
            <label className="block mb-2">
              Chest Number:
              <input
                name="chestNumber"
                className="border w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Position:
              <select name="position" className="border w-full p-2">
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
                <option value="Fifth">Fifth</option>
              </select>
            </label>
            <label className="block mb-2">
              Mark:
              <input
                name="mark"
                type="number"
                className="border w-full p-2"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowIndividualForm(false)}
                className="mr-4 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}

      {showGeneralForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
          <motion.form
            onSubmit={(e) => handleSubmit(e, "general")}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold mb-4">Add General Mark</h2>
            <label className="block mb-2">
              Item:
              <select
                name="item"
                value={itemType}
                onChange={handleItemTypeChange}
                className="border w-full p-2"
              >
                <option value="sports">Sports</option>
                <option value="arts">Arts</option>
              </select>
            </label>
            <label className="block mb-2">
              Programme:
              <select name="programme" className="border w-full p-2">
                <option value="">Select a programme</option>
                {itemType === "sports" && (
                  <>
                    <option value="Running">Running</option>
                    <option value="Relay">Relay</option>
                    <option value="Javelin">Javelin</option>
                    <option value="Jumping">Jumping</option>
                  </>
                )}
                {itemType === "arts" && (
                  <>
                    <option value="Essay">Essay</option>
                    <option value="Speech">Speech</option>
                    <option value="Reading">Reading</option>
                    <option value="Quiz">Quiz</option>
                  </>
                )}
              </select>
            </label>
            <label className="block mb-2">
              Team:
              <select
                name="team"
                className="border w-full p-2"
              >
                <option value="dhamak">Dhamak</option>
                <option value="Jhalak">Jhalak</option>
                <option value="chamak">Chamak</option>
              </select>
            </label>
            <label className="block mb-2">
              Position:
              <select name="position" className="border w-full p-2">
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
                <option value="Fifth">Fifth</option>
              </select>
            </label>
            <label className="block mb-2">
              Mark:
              <input
                name="mark"
                type="number"
                className="border w-full p-2"
              />
            </label>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowGeneralForm(false)}
                className="mr-4 text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </div>
  );
};

export default MarkList;
