"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
<!-- finish first page -->


"use client"

import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;




<!-- yearly backup -->


import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title="Yearly Breakup">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            $36,358
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2022
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2023
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={150} width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;


<!-- product perfomence -->


import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];


const ProductPerformance = () => {
    return (

        <DashboardCard title="Product Performance">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Assigned
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;



<!-- typography -->

'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';


const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="this is Typography">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Default Text">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1">h1. Heading</Typography>
                    <Typography variant="body1" color="textSecondary">
                      font size: 30 | line-height: 45 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h2">h2. Heading</Typography>
                    <Typography variant="body1" color="textSecondary">
                      font size: 24 | line-height: 36 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h3">h3. Heading</Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 21 | line-height: 31.5 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h4">h4. Heading</Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 18 | line-height: 27 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5">h5. Heading</Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 16 | line-height: 24 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h6">h6. Heading</Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 14 | line-height: 21 | font weight: 500
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="subtitle1">
                      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                      tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 16 | line-height: 28 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="subtitle2">
                      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                      tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 14 | line-height: 21 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="body1">
                      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 16 | line-height: 24 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="body2">
                      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 14 | line-height: 20 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="caption">
                      caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                      tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 12 | line-height: 19 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="overline">
                      overline. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                      tenetur
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      font size: 12 | line-height: 31 | font weight: 400
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>

          </DashboardCard>
        </Grid>
        <Grid item sm={12}>
          <DashboardCard title="Default Text">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" color="textprimary">
                      Text Primary
                    </Typography>

                    <Typography variant="body1" color="textprimary">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" color="textSecondary">
                      Text Secondary
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.info.main }}>
                      Text Info
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.info.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.primary.main }}>
                      Text Primary
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.primary.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.warning.main }}>
                      Text Warning
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.warning.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.error.main }}>
                      Text Error
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.error.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: (theme) => theme.palette.success.main }}>
                      Text Success
                    </Typography>

                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.success.main }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid >
    </PageContainer>
  );
};

export default TypographyPage;

<!-- monthly earning -->

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: any = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Monthly Earnings"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          $6,820
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;


<!-- marklist -->
// app/api/programmes/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const marklist = await db
      .collection("marklist")
      .find({}, { projection: { _id: 1, programme: 1, chestNumber: 1, position: 1, mark: 1, name: 1, category: 1, team: 1 } })
      .toArray();

    // Ensure the result is a flat array, not an indexed object
    return new Response(JSON.stringify(marklist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch marklist." }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    // Check chest number in studentslist
    const student = await db.collection("studentslist").findOne({ chestNumber: body.chestNumber });

    if (student) {
      body.name = student.name;
      body.category = student.category;
      body.team = student.team;
    } else {
      return new Response(JSON.stringify({ error: "Chest number not found." }), { status: 404 });
    }

    // Store full data to marklist collection
    const result = await db.collection("marklist").insertOne({
      programme: body.programme,
      chestNumber: body.chestNumber,
      position: body.position,
      mark: body.mark,
      name: body.name,
      category: body.category,
      team: body.team
    });

    return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add mark." }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { _id, update } = await req.json();
    const db = await connectToDatabase();
    const result = await db.collection("marklist").updateOne({ _id: new ObjectId(_id) }, { $set: update });

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Mark not found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to edit mark." }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { _id } = await req.json();
    const db = await connectToDatabase();
    const result = await db.collection("marklist").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Mark not found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete mark." }), { status: 500 });
  }
}

<!-- this is students list page -->
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




<!-- updates -->

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Button, TextField, CircularProgress } from "@mui/material";

interface MarklistItem {
  _id: string;
  name: string;
  image?: string; // Optional, since it might not exist for all documents
}

const ManageImages: React.FC = () => {
  const [marklist, setMarklist] = useState<MarklistItem[]>([]);
  const [newImageLink, setNewImageLink] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch marklist data from the database
  const fetchMarklist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/marklistimage");
      if (!response.ok) {
        throw new Error("Failed to fetch marklist data");
      }
      const data: MarklistItem[] = await response.json();
      setMarklist(data);
    } catch (error) {
      console.error("Error fetching marklist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update the image link in the database
  const updateImageLink = async (id: string) => {
    if (!newImageLink.trim()) {
      alert("Please enter a valid image link.");
      return;
    }
  
    try {
      const response = await fetch(`/api/marklistimage/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: newImageLink }),
      });
  
      if (response.ok) {
        alert("Image updated successfully");
        setNewImageLink(""); // Clear the input
        fetchMarklist(); // Refresh data
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  useEffect(() => {
    fetchMarklist();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-6 lg:p-8">
      <Typography variant="h5" gutterBottom className="text-center text-gray-800">
        Manage Images
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marklist.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Typography variant="h6" className="text-lg font-medium text-gray-800">{item.name}</Typography>
            <motion.img
              src={item.image || "/default-avatar.png"} // Default image if none exists
              alt={item.name}
              className="rounded-full w-24 h-24 object-cover mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <TextField
              label="New Image Link"
              fullWidth
              size="small"
              variant="outlined"
              value={selectedId === item._id ? newImageLink : ""}
              onChange={(e) => {
                setSelectedId(item._id);
                setNewImageLink(e.target.value);
              }}
              className="mt-2"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={() => updateImageLink(item._id)}
            >
              Update Image
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageImages;







<!-- dashboard -->
'use client'

import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/(DashboardLayout)/components/container/PageContainer';
import { motion } from 'framer-motion';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/components/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={3}>
          {/* Sales Overview */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SalesOverview />
            </motion.div>
          </Grid>

          {/* Yearly Breakup and Monthly Earnings */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <YearlyBreakup />
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MonthlyEarnings />
                </motion.div>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Transactions */}
          {/* <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecentTransactions />
            </motion.div>
          </Grid> */}

          {/* Product Performance */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductPerformance/>
            </motion.div>
          </Grid>

          {/* Blog Section */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Blog />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;



<!-- mark list -->

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
                <option value="dhamakk">Dhamakk</option>
                <option value="chalakk">Chalakk</option>
                <option value="chamakk">Chamakk</option>
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


<!-- dashboard -->

'use client';

import PageContainer from '@/components/(DashboardLayout)/components/container/PageContainer';
import { motion } from 'framer-motion';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import DynamicImageSlider from '@/app/(DashboardLayout)/components/dashboard/DynamicImageSlider';
import LeadersImage from '@/app/(DashboardLayout)/components/dashboard/LeadersImage';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 2xl:gap-8">
          {/* Sales Overview */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SalesOverview />
            </motion.div>
          </div>

          {/* Yearly Breakup and Monthly Earnings */}
          <div className="col-span-1 lg:col-span-1">
            <div className="grid grid-cols-1 gap-6 2xl:gap-8">
              <div className="col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <YearlyBreakup />
                </motion.div>
              </div>
              <div className="col-span-1 ">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MonthlyEarnings />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Dynamic Image Slider (Full Row) */}
          <div className="col-span-1 lg:col-span-3 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DynamicImageSlider />
            </motion.div>
          </div>
          <div className="col-span-1 lg:col-span-3 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LeadersImage/>
            </motion.div>
          </div>

          {/* Blog Section (Full Row) */}
          <div className="col-span-1 lg:col-span-3 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Blog />
            </motion.div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;







<!-- programmes -->

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
