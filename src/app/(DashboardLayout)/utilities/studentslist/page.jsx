'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StudentsList() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        chestNumber: '',
        team: 'dhamak',
        category: 'aliya',
    });
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showMenu, setShowMenu] = useState(null);

    // Fetch students on initial load
    useEffect(() => {
        async function fetchStudents() {
            const response = await fetch('/api/studentslist');
            const data = await response.json();
            setStudents(data);
        }
        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = selectedStudentId ? 'PUT' : 'POST';
        const url = selectedStudentId
            ? `/api/studentslist/${selectedStudentId}`
            : '/api/studentslist';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const updatedStudents = await fetch('/api/studentslist').then((res) => res.json());
            setStudents(updatedStudents);
            setShowForm(false);
            setSelectedStudentId(null);
            setFormData({ name: '', chestNumber: '', team: 'dhamak', category: 'aliya' });
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/studentslist/${id}`, { method: 'DELETE' });
        if (response.ok) {
            const updatedStudents = await fetch('/api/studentslist').then((res) => res.json());
            setStudents(updatedStudents);
        }
    };

    const handleEdit = (student) => {
        setFormData({
            name: student.name,
            chestNumber: student.chestNumber,
            team: student.team,
            category: student.category,
        });
        setSelectedStudentId(student._id);
        setShowForm(true);
        setShowMenu(null);
    };

    const handleOutsideClick = () => setShowMenu(null);

    return (
        <div
            className="p-4 relative min-h-screen "
            onClick={handleOutsideClick}
        >
            {/* Students List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['dhamak', 'jhalak', 'chamak'].map((team) => (
                    <div
                        key={team}
                        className="bg-white rounded-lg shadow-lg p-6 border border-gray-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 capitalize border-b pb-2 mb-4">
                            {team}
                        </h2>
                        <ul className="space-y-4">
                            {students
                                .filter((student) => student.team === team)
                                .map((student) => (
                                    <li
                                        key={student._id}
                                        className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center relative hover:bg-gray-200"
                                    >
                                        <p className="text-gray-800 font-medium">{student.name}</p>
                                        <div className="relative">
                                            <button
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowMenu((prev) => (prev === student._id ? null : student._id));
                                                }}
                                            >
                                                •••
                                            </button>
                                            {showMenu === student._id && (
                                                <motion.div
                                                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                        onClick={() => handleEdit(student)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                                        onClick={() => handleDelete(student._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Add Student Button */}
            <motion.button
                className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowForm(true);
                    setSelectedStudentId(null);
                }}
            >
                Add Student
            </motion.button>

            {/* Add/Edit Student Form */}
            {showForm && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowForm(false);
                    }}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {selectedStudentId ? 'Edit Student' : 'Add Student'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block font-bold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Chest Number</label>
                                <input
                                    type="text"
                                    name="chestNumber"
                                    value={formData.chestNumber}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Team</label>
                                <select
                                    name="team"
                                    value={formData.team}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="dhamak">dhamak</option>
                                    <option value="jhalak">jhalak</option>
                                    <option value="chamak">chamak</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="aliya">aliya</option>
                                    <option value="bidaya">bidaya</option>
                                    <option value="thanawiyya">thanawiyya</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                    {selectedStudentId ? 'Save' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
