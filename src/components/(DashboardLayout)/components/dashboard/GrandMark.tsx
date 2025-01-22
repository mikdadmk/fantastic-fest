"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TeamData {
  team: string;
  totalMarks: number;
}

const GrandMark = () => {
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [chartData, setChartData] = useState<{
    series: number[];
    labels: string[];
  }>({ series: [], labels: [] });
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await fetch("/api/teamsmark");
        const data: TeamData[] = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const series = data.map((team) => team.totalMarks);
          const labels = data.map((team) => team.team);

          setChartData({ series, labels });
          setTeamData(data);
        } else {
          console.error("Invalid or empty data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTeamsData();
  }, []);

  useEffect(() => {
    if (teamData.length > 1) {
      const interval = setInterval(() => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teamData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [teamData]);

  const getColorForTeam = (team: string): string => {
    switch (team.toLowerCase()) {
      case "dhamak":
        return "#FF0000";
      case "chamak":
        return "#00FF00";
      case "jhalak":
        return "#0000FF";
      default:
        return "#ecf2ff";
    }
  };

  const colors = chartData.labels.map((label) => getColorForTeam(label));

  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
    },
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // Reduced size
        },
      },
    },
    tooltip: {
      theme: "light",
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    labels: chartData.labels,
  };

  const currentTeam = teamData[currentTeamIndex] || {
    team: "Loading...",
    totalMarks: 0,
  };

  return (
    <DashboardCard title="Grand Mark">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-center">
        {/* Team Info */}
        <motion.div
          key={currentTeamIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start space-y-4 p-4 sm:p-6"
        >
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
            {currentTeam.team}
          </h4>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {currentTeam.totalMarks.toLocaleString()}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm font-medium text-gray-600">
              Compared to another team
            </p>
            <div
              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 
      sm:rotate-[130deg] -rotate-45" // Default for larger screens (right-top middle), mobile (bottom)
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-9 text-green-600 p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          key={`chart-${currentTeamIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <div
            className="flex justify-center items-center"
            style={{
              width: "100%",
              maxWidth: "250px", // Reduced size
              aspectRatio: "1",
            }}
          >
            <Chart
              options={optionscolumnchart}
              series={chartData.series}
              type="donut"
              height="100%"
              width="100%"
            />
          </div>
        </motion.div>
      </div>
    </DashboardCard>
  );
};

export default GrandMark;
