"use client";

import { useState, useEffect } from "react";
import { Avatar, Stack, Typography, Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { motion } from "framer-motion";

interface Performer {
  chestNumber?: string;
  name?: string;
  totalMark: number;
  image?: string;
  team: string;
}

const AllPerformers: React.FC = () => {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchPerformers();
  }, [filter]);

  const fetchPerformers = async () => {
    try {
      const query = new URLSearchParams();
      if (filter) query.append("filter", filter);

      const response = await fetch(`/api/marklist-topperformers?${query.toString()}`);
      const data: Performer[] = await response.json();
      setPerformers(data);
    } catch (error) {
      console.error("Error fetching performers:", error);
    }
  };

  return (
    <Box p={3} sx={{ background: "linear-gradient(135deg, #f1f1f1, #c5e1e5)", borderRadius: "12px" }}>
      <Typography variant="h4" fontWeight="700" gutterBottom sx={{ textAlign: "center", color: "#2c3e50" }}>
        Performers
      </Typography>

      {/* Filter Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="general">General (Top Teams)</MenuItem>
          <MenuItem value="dhamak">Dhamak</MenuItem>
          <MenuItem value="jhalak">jhalak</MenuItem>
          <MenuItem value="chamak">Chamak</MenuItem>
          <MenuItem value="aliya">Aliya</MenuItem>
          <MenuItem value="bidaya">Bidaya</MenuItem>
          <MenuItem value="thanawiyya">Thanawiyya</MenuItem>
        </Select>
      </FormControl>

      {/* Performer List */}
      {performers.map((performer) => (
        <motion.div
          key={performer.team + (performer.chestNumber || "")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "white",
            borderRadius: "8px",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={3}>
            {performer.image && <Avatar src={performer.image} alt={performer.name} sx={{ width: 80, height: 80 }} />}
            <Box textAlign="center">
              {performer.name && (
                <Typography variant="h5" fontWeight="700" sx={{ color: "#34495e" }}>
                  {performer.name}
                </Typography>
              )}
              <Typography variant="subtitle1" color="textSecondary">
                Total Mark: {performer.totalMark}
              </Typography>
              {performer.chestNumber && (
                <Typography variant="body2" color="textSecondary">
                  Chest Number: {performer.chestNumber}
                </Typography>
              )}
              <Typography variant="body2" color="textSecondary">
                Team: {performer.team}
              </Typography>
            </Box>
          </Stack>
        </motion.div>
      ))}
    </Box>
  );
};

export default AllPerformers;
