"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, Stack, Typography, Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

interface TopPerformer {
  chestNumber: string;
  name: string;
  totalMark: number;
  image: string;
}

const TopPerformers: React.FC = () => {
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchTopPerformers();
  }, []);

  const fetchTopPerformers = async () => {
    try {
      const response = await fetch("/api/marklist-topperformers");
      const performers: TopPerformer[] = await response.json();
      setTopPerformers(performers);
    } catch (error) {
      console.error("Error fetching top performers:", error);
    }
  };

  return (
    <DashboardCard title="Top Performers">
      <>
        {topPerformers.slice(0, 3).map((performer, index) => (
          <motion.div
            key={performer.chestNumber}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }} // Up and down animation
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.3,
            }}
            className="top-performer-card"
          >
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              alignItems="center"
              spacing={isSmallScreen ? 3 : 6}
              sx={{
                marginBottom: isSmallScreen ? 3 : 4,
              }}
            >
              <Avatar
                src={performer.image}
                alt={performer.name}
                sx={{
                  width: isSmallScreen ? 64 : 80,
                  height: isSmallScreen ? 64 : 80,
                }}
              />
              <Box textAlign={isSmallScreen ? "center" : "left"}>
                <Typography variant="h5" fontWeight="700">
                  {performer.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Total Mark: {performer.totalMark}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Chest Number: {performer.chestNumber}
                </Typography>
              </Box>
            </Stack>
          </motion.div>
        ))}
        {topPerformers.length > 3 && (
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/top-performers")}
            >
              Read More
            </Button>
          </Box>
        )}
      </>
    </DashboardCard>
  );
};

export default TopPerformers;
