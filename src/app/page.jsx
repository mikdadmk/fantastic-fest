"use client"
import { motion } from 'framer-motion'
import Home from '@/app/(DashboardLayout)/components/home/home'
import About from '@/app/(DashboardLayout)/components/home/about'
import Contact from '@/app/(DashboardLayout)/components/home/contact'
import Dashboard from '@/app/(DashboardLayout)/components/home/dashboard'
import DynamicImageSlider from '@/app/(DashboardLayout)/components/dashboard/DynamicImageSlider'
import LeadersImage from '@/app/(DashboardLayout)/components/dashboard/LeadersImage'

import React from 'react'

function page() {
  return (
    <div className="font-[Aesthetic-Romance] "> {/* Apply font globally to the page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Home />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0 }}
      >
        <About />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Dashboard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex justify-center items-center  bg-gray-100"
      >
        <div className="w-full max-w-screen-lg bg-gray-100">
          <DynamicImageSlider />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="flex justify-center items-center  bg-gray-100"
      >
        <div className="w-full max-w-screen-lg bg-gray-100">
          <LeadersImage />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <Contact />
      </motion.div>
    </div>
  )
}

export default page
