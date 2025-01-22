import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

// Dynamically load the Chart component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type TeamData = {
  team: string;
  totalMarks: number;
};

const SalesOverview = () => {
  const [allTeamsData, setAllTeamsData] = useState<TeamData[]>([]);
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(695); // Default height for large screens

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/teamsmark");
        const data: TeamData[] = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          console.error("No data or invalid data format.");
          return;
        }

        setAllTeamsData(data);

        const labels = data.map((team) => team.team);
        const series = data.map((team) => team.totalMarks);

        setCategories(labels);
        setChartData([
          {
            name: "Total Marks",
            data: series,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Track window size and adjust chart height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(400); // Set smaller height for small screens
      } else if (window.innerWidth < 1024) {
        setChartHeight(500); // Set medium height for medium screens
      } else {
        setChartHeight(695); // Set default height for larger screens
      }
    };

    // Run on initial load
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define constant team colors
  const teamColors: Record<string, string> = {
    dhamak: "#FF0000", // Red
    jhalak: "#0000FF", // Blue
    chamak: "#008000", // Green
  };

  const options = {
    chart: {
      type: "bar" as const,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        distributed: true, // Enable per-bar colors
        borderRadius: 4,
        horizontal: false,
      },
    },
    colors: allTeamsData.map((team) => teamColors[team.team] || "#000000"), // Use team colors, default to black if no match
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(0),
      },
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
    },
  };

  return (
    <DashboardCard title="TEAMS MARK">
      {chartData.length > 0 && categories.length > 0 ? (
        <Chart options={options} series={chartData} type="bar" height={chartHeight} />
      ) : (
        <p>No data available to display.</p>
      )}
    </DashboardCard>
  );
};

export default SalesOverview;
