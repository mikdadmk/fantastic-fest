"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

export default function Programmes() {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        setError(null);

        const [studentslistResponse, marklistResponse] = await Promise.all([
          fetch("/api/studentslist"),
          fetch("/api/marklist"),
        ]);

        if (!studentslistResponse.ok || !marklistResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const studentslist = await studentslistResponse.json();
        const marklist = await marklistResponse.json();

        const groupedProgrammes = marklist.reduce((acc, item) => {
          const student = studentslist.find(
            (s) => s.chestNumber === item.chestNumber
          );
          const participant = { ...item, image: student?.image || null };

          if (!acc[item.programme]) {
            acc[item.programme] = {
              type: item.type,
              participants: [],
            };
          }
          acc[item.programme].participants.push(participant);

          return acc;
        }, {});

        Object.keys(groupedProgrammes).forEach((programmeName) => {
          groupedProgrammes[programmeName].participants.sort((a, b) => {
            const order = { first: 1, second: 2, third: 3 };
            return (
              (order[a.position.toLowerCase()] || 999) -
              (order[b.position.toLowerCase()] || 999)
            );
          });
        });

        setProgrammes(groupedProgrammes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const handleProgrammeClick = (programmeName) => {
    if (selectedProgramme === programmeName) {
      setSelectedProgramme(null);
      setSelectedCategory(null);
    } else {
      setSelectedProgramme(programmeName);
      setSelectedCategory(null);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getProfileColor = (teamName) => {
    switch (teamName.toLowerCase()) {
      case "jhalak":
        return "bg-blue-500";
      case "dhamak":
        return "bg-red-500";
      case "chamak":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-8">
      <div className="w-full flex justify-between items-center mb-10">
        <button
          onClick={() => window.history.back()}
          className="text-xl text-gray-800 hover:text-blue-500 flex items-center p-2 sm:p-4 md:p-6 transition duration-300"
        >
          <FaArrowLeft className="mr-2 text-lg sm:text-2l md:text-2xl" />
          <span className="hidden sm:block">Back</span>
        </button>
        <div className="w-full flex justify-center items-center mb-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Programmes
          </motion.h1>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(programmes).map(
            ([programmeName, { type, participants }]) => {
              const categories = {
                aliya: [],
                bidaya: [],
                thanawiyya: [],
                general: [],
              };

              participants.forEach((p) => {
                if (p.category.toLowerCase() === "aliya")
                  categories.aliya.push(p);
                else if (p.category.toLowerCase() === "bidaya")
                  categories.bidaya.push(p);
                else if (p.category.toLowerCase() === "thanawiyya")
                  categories.thanawiyya.push(p);
                else categories.general.push(p);
              });

              return (
                <div key={programmeName} className="space-y-4">
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

                  {selectedProgramme === programmeName && (
                    <div className="mt-6 space-y-6">
                      {type === "individual" ? (
                        <>
                          <div className="flex flex-wrap gap-4 mb-6 justify-center">
                            {["aliya", "bidaya", "thanawiyya"].map(
                              (category) =>
                                categories[category].length > 0 && (
                                  <button
                                    key={category}
                                    onClick={() =>
                                      handleCategoryClick(category)
                                    }
                                    className={`px-4 py-2 rounded-full text-white font-semibold transition duration-300 ${
                                      selectedCategory === category
                                        ? "bg-blue-500"
                                        : "bg-gray-500 hover:bg-gray-600"
                                    }`}
                                  >
                                    {category.charAt(0).toUpperCase() +
                                      category.slice(1)}
                                  </button>
                                )
                            )}
                          </div>

                          {selectedCategory &&
                            categories[selectedCategory]?.length > 0 &&
                            categories[selectedCategory].map(
                              (participant, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-white p-5 rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex items-center space-x-4">
                                    {participant.image ? (
                                      <Image
                                        src={participant.image}
                                        alt={`${participant.name}'s profile`}
                                        className="w-14 h-14 rounded-full object-cover"
                                        width={56} // Add width
                                        height={56} // Add height
                                      />
                                    ) : (
                                      <div
                                        className={`w-20 h-20 rounded-full text-white flex items-center justify-center text-base font-bold ${getProfileColor(
                                          participant.team
                                        )}`}
                                      >
                                        {participant.team}
                                      </div>
                                    )}
                                    <div>
                                      <p className="font-bold text-gray-800">
                                        {participant.name}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Position:</strong>{" "}
                                        {participant.position}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Team:</strong>{" "}
                                        {participant.team}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            )}
                        </>
                      ) : (
                        categories.general.map((participant, index) => (
                          <motion.div
                            key={index}
                            className="bg-white p-5 rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-20 h-20 rounded-full text-white flex items-center justify-center text-base font-bold ${getProfileColor(
                                  participant.team
                                )}`}
                              >
                                {participant.team}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">
                                  {participant.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Team:</strong> {participant.team}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Position:</strong>{" "}
                                  {participant.position}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
