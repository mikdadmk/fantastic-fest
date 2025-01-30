"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, Stack, Typography, Box, FormControl, Select, MenuItem, InputLabel, Button, Dialog } from "@mui/material";
import { motion } from "framer-motion";

interface Performer {
  chestNumber?: string;
  name?: string;
  totalMark: number;
  image?: string;
  team: string;
}

interface Result {
  programme: string;
  position: string;
  mark: number;
}

const AllPerformers: React.FC = () => {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>(null);
  const [performerResults, setPerformerResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);

  const fetchPerformers = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      if (filter) query.append("filter", filter);

      const response = await fetch(`/api/marklist-topperformers?${query.toString()}`);
      const data: Performer[] = await response.json();
      setPerformers(data);
    } catch (error) {
      console.error("Error fetching performers:", error);
    }
  }, [filter]);

  useEffect(() => {
    fetchPerformers();
  }, [fetchPerformers]);

  // Fetch results for a selected performer
  const fetchPerformerResults = async (chestNumber?: string) => {
    if (!chestNumber) return;
    try {
      const response = await fetch(`/api/marklist-topperformers?chestNumber=${chestNumber}`);
      const data: Result[] = await response.json();
      setPerformerResults(data);
      setOpen(true); // Open modal
    } catch (error) {
      console.error("Error fetching performer results:", error);
    }
  };

  // Handle performer selection
  const handlePerformerClick = (performer: Performer) => {
    setSelectedPerformer(performer);
    fetchPerformerResults(performer.chestNumber);
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
            cursor: "pointer",
          }}
          onClick={() => handlePerformerClick(performer)}
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

      {/* Modal for displaying detailed results */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={3} sx={{ minWidth: 300 }}>
          <Typography variant="h5" fontWeight="700" sx={{ textAlign: "center", mb: 2 }}>
            {selectedPerformer?.name} Results
          </Typography>
          {performerResults.length > 0 ? (
            performerResults.map((result, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, background: "#f5f5f5", borderRadius: "8px" }}>
                <Typography variant="body1">
                  <strong>Programme:</strong> {result.programme}
                </Typography>
                <Typography variant="body1">
                  <strong>Position:</strong> {result.position}
                </Typography>
                <Typography variant="body1">
                  <strong>Mark:</strong> {result.mark}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              No results found.
            </Typography>
          )}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AllPerformers;
