"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Programmes() {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from APIs
        const [studentslistResponse, marklistResponse] = await Promise.all([
          fetch("/api/studentslist"),
          fetch("/api/marklist"),
        ]);

        if (!studentslistResponse.ok || !marklistResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const studentslist = await studentslistResponse.json();
        const marklist = await marklistResponse.json();

        // Group marklist by programme and include images
        const groupedProgrammes = marklist.reduce((acc, item) => {
          const student = studentslist.find(
            (student) => student.chestNumber === item.chestNumber
          );

          const participant = {
            ...item,
            image: student?.image || null,
          };

          acc[item.programme] = acc[item.programme] || [];
          acc[item.programme].push(participant);

          return acc;
        }, {});

        // Sort participants by position in each programme
        const sortedProgrammes = Object.entries(groupedProgrammes).map(
          ([programmeName, participants]) => [
            programmeName,
            participants.sort((a, b) => {
              const positionOrder = ["first", "second", "third"];
              return (
                positionOrder.indexOf(a.position.toLowerCase()) -
                positionOrder.indexOf(b.position.toLowerCase())
              );
            }),
          ]
        );

        setProgrammes(sortedProgrammes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const categorizeParticipants = (programmeName, participants) => {
    const categories = {
      aliya: [],
      bidaya: [],
      thanawiyya: [],
      general: [],
    };

    participants.forEach((participant) => {
      if (participant.category.toLowerCase() === "aliya") {
        categories.aliya.push(participant);
      } else if (participant.category.toLowerCase() === "bidaya") {
        categories.bidaya.push(participant);
      } else if (participant.category.toLowerCase() === "thanawiyya") {
        categories.thanawiyya.push(participant);
      } else {
        categories.general.push(participant);
      }
    });

    return categories;
  };

  const handleProgrammeClick = (programmeName) => {
    if (selectedProgramme === programmeName) {
      setSelectedProgramme(null); // Toggle off if the same programme is clicked
      setSelectedCategory(null);  // Reset category selection
    } else {
      setSelectedProgramme(programmeName); // Show details if a different programme is clicked
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Show selected category only
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-8">
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Programmes
      </motion.h1>

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

      {!loading && !error && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {programmes.map(([programmeName, participants]) => {
            const categories = categorizeParticipants(programmeName, participants);
            const isIndividual = programmeName.toLowerCase() !== "general"; // Check if individual programme

            return (
              <div key={programmeName} className="space-y-4">
                {/* Programme Card (clickable) */}
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                  onClick={() => handleProgrammeClick(programmeName)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {programmeName}
                  </h3>
                </motion.div>

                {/* If programme is selected, show participants */}
                {selectedProgramme === programmeName && (
                  <div className="mt-6 space-y-6">
                    {/* Show Aliya, Bidaya, Thanawiyya categories only if individual programme */}
                    {isIndividual ? (
                      <>
                        <div className="flex space-x-4 mb-6">
                          {["aliya", "bidaya", "thanawiyya"].map((category) => (
                            <button
                              key={category}
                              onClick={() => handleCategoryClick(category)}
                              className={`px-4 py-2 rounded-full text-white font-semibold transition duration-300 ${
                                selectedCategory === category
                                  ? "bg-blue-500"
                                  : "bg-gray-500 hover:bg-gray-600"
                              }`}
                            >
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                          ))}
                        </div>
                        {/* Display selected category participants */}
                        {selectedCategory && categories[selectedCategory]?.length > 0 && (
                          <div>
                            {categories[selectedCategory].map((participant, index) => (
                              <motion.div
                                key={index}
                                className="bg-white p-5 rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center space-x-4">
                                  {participant.image ? (
                                    <img
                                      src={participant.image}
                                      alt={`${participant.name}'s profile`}
                                      className="w-14 h-14 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                                      {participant.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  <div className="space-y-2">
                                    <p className="font-bold text-gray-800">{participant.name}</p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Position:</strong> {participant.position}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Team:</strong> {participant.team}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // If "General", only show general participants
                      <div>
                        {categories.general.length > 0 && (
                          <div>
                            {categories.general.map((participant, index) => (
                              <motion.div
                                key={index}
                                className="bg-white p-5 rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center space-x-4">
                                  {participant.image ? (
                                    <img
                                      src={participant.image}
                                      alt={`${participant.name}'s profile`}
                                      className="w-14 h-14 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                                      {participant.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  <div className="space-y-2">
                                    <p className="font-bold text-gray-800">{participant.name}</p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Position:</strong> {participant.position}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Team:</strong> {participant.team}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
