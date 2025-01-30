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
            <option value="Debate">Debate</option>
                    <option value="Qawwali">Qawwali</option>
                    <option value="Sama Sufi Night">Sama Sufi Night (8 minutes/)</option>
                    <option value="Muqara'a">Muqaraa</option>
                    <option value="Qari Imitation">Qari Imitation</option>
                    <option value="Q-science PPT">Q-science PPT</option>
                    <option value="Q-Talent Hunt">Q-Talent Hunt</option>
                    <option value="Qur'anic Debate">Quranic Debate</option>
                    <option value="Group Discussion">Group Discussion</option>
                    <option value="Group Song">Group Song</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Collage">Collage</option>
                    <option value="Newspapper Making">Newspapper Making</option>
                    <option value="sackraicing">Sack Raicing</option>
                    <option value="wicketwicket">Wicket Wicket</option>
                    <option value="frogjump">Frog Jump</option>
                    <option value="wakkawakka">Wakka Wakka</option>
                    <option value="brickbalancing">Brick Balancing</option>
                    <option value="cycling">Cycling</option>
                    <option value="glassbalancing">Glass Balancing</option>
                    <option value="cycling">Cycling</option>
                    <option value="portbreaking">Port Breaking</option>
                    <option value="shootout">Shootout</option>
                    <option value="lemonspoon">Lemon Spoon</option>
                    <option value="freestyle">Freestyle</option>
                    <option value="juggling">Juggling</option>
                    <option value="armwrestling">Arm Wrestling</option>
                    <option value="clapping">Clapping</option>
                    <option value="chess">Chess</option> 
                    <option value="pushup">Pushup</option>
                    <option value="sodafilling">Soda Filling</option>
                    <option value="waterfilling">Water Filling</option>
                    <option value="futsal">Futsal</option>
                    <option value="badminton">Badminton</option>
                    <option value="sweeteating">Sweet Eating</option>
                    <option value="musicchair">Music Chair</option>
                    <option value="running200">Running 200</option>
                    <option value="running400">Running 400</option>
                    <option value="highjumb">High Jumb</option>
                    <option value="frogjumb">Frog Jumb</option>
                    <option value="Disucs Throw">Disucs Throw</option>
                    <option value="Long Jumb">Long Jumb</option>
                    <option value="Shot Put">Shot Put</option>
                    <option value="Walking 100">Walking 100</option>
                    <option value="Walking 200">Walking 200</option>
                    <option value="Tripple Jumb">Tripple Jumb</option>
                    <option value="Relay">Relay</option>
                    <option value="Running 100">Running 100</option>
                    <option value="Pullup">Pullup</option>
                    <option value="Javeling Throw">Javeling Throw</option>
                    <option value="Speech Malayalam">Speech Malayalam</option>
                    <option value="Speech Arabic">Speech Arabic</option>
                    <option value="Speech English">Speech English</option>
                    <option value="Speech Urdu">Speech Urdu</option>
                    <option value="Nasheeda">Nasheeda</option>
                    <option value="Madhunnabi">Madhunnabi</option>
                    <option value="Ma'shara">Mashara</option>
                    <option value="Jam">Jam</option>
                    <option value="Va'az">Vaaz</option>
                    <option value="Speech">Speech</option>
                    <option value="Mash Up Song">Mash Up Song</option>
                    <option value="Qira'th">Qirath</option>
                    <option value="Expert Hafiz">Expert Hafiz</option>
                    <option value="Hidaya Inspiration">Hidaya Inspiration</option>
                    <option value="Grammer Quiz">Grammer Quiz</option>
                    <option value="Spelling Bee">Spelling Bee</option>
                    <option value="GK Talent">GK Talent</option>
                    <option value="Extemporary Speech Malyalam">Extemporary Speech Malyalam</option>
                    <option value="Extemporary Speech English">Extemporary Speech English</option>
                    <option value="Extemporay Speech Arabic">Extemporay Speech Arabic</option>
                    <option value="Mappila Pattu">Mappila Pattu</option>
                    <option value="Song Urdu">Song Urdu</option>
                    <option value="Song English">Song English</option>
                    <option value="Motivation Speech">Motivation Speech</option>
                    <option value="Quthuba">Qutuba</option>
                    <option value="Tadrees">Tadrees</option>
                    <option value="Junction Speech">Junction Speech</option>
                    <option value="News Reading English">News Reading English</option>
                    <option value="Mulafaza">Mulafaza</option>
                    <option value="Word Fight">Word Fight</option>
                    <option value="Story Telling">Story Telling</option>
                    <option value="Azan">Azan</option>
                    <option value="Math Talent">Math Talent</option>
                    <option value="Thaleelul Ibara">Thaleelul Ibara</option>
                    <option value="Status Video Making">Status Video Making</option>
                    <option value="Short Story Malayalm">Short Story Malayalm</option>
                    <option value="Short Story English">Short Story English</option>
                    <option value="Poem Writing Arabic">Poem Writing Arabic</option>
                    <option value="Hiku Poem Malayalam">Hiku Poem Malayalam</option>
                    <option value="News Reporting Malayalam">News Reporting Malayalam</option>
                    <option value="News Reporting English">News Reporting English</option>
                    <option value="Typing English">Typing English</option>
                    <option value="Typing Malayalam">Typing Malayalam</option>
                    <option value="Typing Arabic">Typing Arabic</option>
                    <option value="Translation URD-MLM">Translation URD-MLM</option>
                    <option value="Translation ENG-MLM">Translation ENG-MLM</option>
                    <option value="Caption Making Malyalam">Caption Making Malyalam</option>
                    <option value="Heading Making English">Heading Making English</option>
                    <option value="Heading Making Arabic">Heading Making Arabic</option>
                    <option value="Heading Making Urdu">Heading Making Urdu</option>
                    <option value="Calligraphy">Quiz</option>
                    <option value="Feature Writing Malayalam">Feature Writing Malayalam</option>
                    <option value="Essay Writing Malayalam">Essay Writing Malayalam</option>
                    <option value="Essay Writing English">Essay Writing English</option>
                    <option value="Essay Writing Arabic">Essay Writing Arabic</option>
                    <option value="Pencil Drawing">Pencil Drawing</option>
                    <option value="Digital Poster Designing">Digital Poster Designing</option>
                    <option value="Photography">Photography</option>
                    <option value="Poem Writing Malayalam">Poem Writing Malayalam</option>
                    <option value="Letter Writing English">Letter Writing English</option>
                    <option value="Sudoku">Sudoku</option>
                    <option value="Dictionry Making">Dictionry Making</option>
                    <option value="MS Paint">MS Paint</option>
                    <option value="Story Completion">Story Completion</option>
                    <option value="Tug Of War">Tug Of War</option>
                    <option value="Badminton Doubles">Badminton Doubles</option>
                    <option value="Kabadi">Kabadi</option>
                    <option value="Cricket">Cricket</option>
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
                    <option value="sackraicing">Sack Raicing</option>
                    <option value="wicketwicket">Wicket Wicket</option>
                    <option value="frogjump">Frog Jump</option>
                    <option value="wakkawakka">Wakka Wakka</option>
                    <option value="brickbalancing">Brick Balancing</option>
                    <option value="cycling">Cycling</option>
                    <option value="glassbalancing">Glass Balancing</option>
                    <option value="cycling">Cycling</option>
                    <option value="portbreaking">Port Breaking</option>
                    <option value="shootout">Shootout</option>
                    <option value="lemonspoon">Lemon Spoon</option>
                    <option value="freestyle">Freestyle</option>
                    <option value="juggling">Juggling</option>
                    <option value="armwrestling">Arm Wrestling</option>
                    <option value="clapping">Clapping</option>
                    <option value="chess">Chess</option> 
                    <option value="pushup">Pushup</option>
                    <option value="sodafilling">Soda Filling</option>
                    <option value="waterfilling">Water Filling</option>
                    <option value="futsal">Futsal</option>
                    <option value="badminton">Badminton</option>
                    <option value="sweeteating">Sweet Eating</option>
                    <option value="musicchair">Music Chair</option>
                    <option value="running200">Running 200</option>
                    <option value="running400">Running 400</option>
                    <option value="highjumb">High Jumb</option>
                    <option value="frogjumb">Frog Jumb</option>
                    <option value="Disucs Throw">Disucs Throw</option>
                    <option value="Long Jumb">Long Jumb</option>
                    <option value="Shot Put">Shot Put</option>
                    <option value="Walking 100">Walking 100</option>
                    <option value="Walking 200">Walking 200</option>
                    <option value="Tripple Jumb">Tripple Jumb</option>
                    <option value="Relay">Relay</option>
                    <option value="Running 100">Running 100</option>
                    <option value="Pullup">Pullup</option>
                    <option value="Javeling Throw">Javeling Throw</option>
                    
                    
                  </>
                )}
                {itemType === "arts" && (
                  <>
                    <option value="Speech Malayalam">Speech Malayalam</option>
                    <option value="Speech Arabic">Speech Arabic</option>
                    <option value="Speech English">Speech English</option>
                    <option value="Speech Urdu">Speech Urdu</option>
                    <option value="Nasheeda">Nasheeda</option>
                    <option value="Madhunnabi">Madhunnabi</option>
                    <option value="Ma'shara">Mashara</option>
                    <option value="Jam">Jam</option>
                    <option value="Va'az">Vaaz</option>
                    <option value="Speech">Speech</option>
                    <option value="Mash Up Song">Mash Up Song</option>
                    <option value="Qira'th">Qirath</option>
                    <option value="Expert Hafiz">Expert Hafiz</option>
                    <option value="Hidaya Inspiration">Hidaya Inspiration</option>
                    <option value="Grammer Quiz">Grammer Quiz</option>
                    <option value="Spelling Bee">Spelling Bee</option>
                    <option value="GK Talent">GK Talent</option>
                    <option value="Extemporary Speech Malyalam">Extemporary Speech Malyalam</option>
                    <option value="Extemporary Speech English">Extemporary Speech English</option>
                    <option value="Extemporay Speech Arabic">Extemporay Speech Arabic</option>
                    <option value="Mappila Pattu">Mappila Pattu</option>
                    <option value="Song Urdu">Song Urdu</option>
                    <option value="Song English">Song English</option>
                    <option value="Motivation Speech">Motivation Speech</option>
                    <option value="Quthuba">Qutuba</option>
                    <option value="Tadrees">Tadrees</option>
                    <option value="Junction Speech">Junction Speech</option>
                    <option value="News Reading English">News Reading English</option>
                    <option value="Mulafaza">Mulafaza</option>
                    <option value="Word Fight">Word Fight</option>
                    <option value="Story Telling">Story Telling</option>
                    <option value="Azan">Azan</option>
                    <option value="Math Talent">Math Talent</option>
                    <option value="Thaleelul Ibara">Thaleelul Ibara</option>      
                    <option value="Short Story Malayalm">Short Story Malayalm</option>
                    <option value="Short Story English">Short Story English</option>
                    <option value="Poem Writing Arabic">Poem Writing Arabic</option>
                    <option value="Hiku Poem Malayalam">Hiku Poem Malayalam</option>
                    <option value="News Reporting Malayalam">News Reporting Malayalam</option>
                    <option value="News Reporting English">News Reporting English</option>
                    <option value="Typing English">Typing English</option>
                    <option value="Typing Malayalam">Typing Malayalam</option>
                    <option value="Typing Arabic">Typing Arabic</option>
                    <option value="Translation URD-MLM">Translation URD-MLM</option>
                    <option value="Translation ENG-MLM">Translation ENG-MLM</option>
                    <option value="Caption Making Malyalam">Caption Making Malyalam</option>
                    <option value="Heading Making English">Heading Making English</option>
                    <option value="Heading Making Arabic">Heading Making Arabic</option>
                    <option value="Heading Making Urdu">Heading Making Urdu</option>
                    <option value="Calligraphy">Calligraphy</option>
                    <option value="Feature Writing Malayalam">Story Telling</option>
                    <option value="Essay Writing Malayalam">Essay Writing Malayalam</option>
                    <option value="Essay Writing English">Essay Writing English</option>
                    <option value="Essay Writing Arabic">Essay Writing Arabic</option>
                    <option value="Pencil Drawing">Pencil Drawing</option>
                    <option value="Digital Poster Designing">Digital Poster Designing</option>
                    <option value="Photography">Photography</option>
                    <option value="Poem Writing Malayalam">Poem Writing Malayalam</option>
                    <option value="Letter Writing English">Letter Writing English</option>
                    <option value="Sudoku">Sudoku</option>
                    <option value="Dictionry Making">Dictionry Making</option>
                    <option value="MS Paint">MS Paint</option>
                    <option value="Story Completion">Story Completion</option>
                    
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
                <option value="A grade">A grade</option>
                <option value="B grade">B grade</option>
                <option value="C grade">C grade</option>
                <option value="D grade">D grade</option>
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
                    <option value="Tug Of War">Tug Of War</option>
                    <option value="Badminton Doubles">Badminton Doubles</option>
                    <option value="Kabadi">Kabadi</option>
                    <option value="Cricket">Cricket</option>
                    
                  </>
                )}
                {itemType === "arts" && (
                  <>
                    <option value="Debate">Debate</option>
                    <option value="Qawwali">Qawwali</option>
                    <option value="Sama Sufi Night">Sama Sufi Night (8 minutes/)</option>
                    <option value="Muqara'a">Muqaraa</option>
                    <option value="Qari Imitation">Qari Imitation</option>
                    <option value="Q-science PPT">Q-science PPT</option>
                    <option value="Q-Talent Hunt">Q-Talent Hunt</option>
                    <option value="Qur'anic Debate">Quranic Debate</option>
                    <option value="Group Discussion">Group Discussion</option>
                    <option value="Group Song">Group Song</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Collage">Collage</option>
                    <option value="Newspapper Making">Newspapper Making</option>
                    <option value="Status Video Making">Status Video Making</option>
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
                <option value="jhalak">Jhalak</option>
                <option value="chamak">Chamak</option>
              </select>
            </label>
            <label className="block mb-2">
              Position:
              <select name="position" className="border w-full p-2">
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="A grade">A grade</option>
                <option value="B grade">B grade</option>
                <option value="C grade">C grade</option>
                <option value="D grade">D grade</option>
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
