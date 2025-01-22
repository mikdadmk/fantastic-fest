'use client';

import PageContainer from '@/components/(DashboardLayout)/components/container/PageContainer';
import { motion } from 'framer-motion';
// components
import SalesOverview from '@/components/(DashboardLayout)/components/dashboard/SalesOverview';
import GrandMark from '@/components/(DashboardLayout)/components/dashboard/GrandMark';
import DynamicImageSlider from '@/components/(DashboardLayout)/components/dashboard/DynamicImageSlider';
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
                  <GrandMark/>
                </motion.div>
              </div>
              <div className="col-span-1">
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
          {/* <div className="col-span-1 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DynamicImageSlider />
            </motion.div>
          </div> */}

          {/* Blog Section (Full Row) */}
          {/* <div className="col-span-1 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Blog />
            </motion.div>
          </div> */}
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
