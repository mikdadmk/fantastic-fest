'use client';

import { useEffect, useState } from 'react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

interface Schedule {
  _id: string;
  programmeName: string;
  time: string; // Format: HH:mm
  date: string; // Format: YYYY-MM-DD
  stage: string;
}

const RecentTransactions: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    // Fetch schedules from the API
    const fetchSchedules = async () => {
      try {
        const res = await fetch('/api/timetransition');
        if (!res.ok) {
          console.error('Error fetching schedules:', await res.text());
          return;
        }
        const data: Schedule[] = await res.json();
        console.log('Fetched schedules:', data); // Debugging log
        setSchedules(data);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getProgrammeStatus = (programmeTime: string, programmeDate: string) => {
    const programmeDateTime = dayjs(`${programmeDate}T${programmeTime}`);
    const diffInMinutes = programmeDateTime.diff(currentTime, 'minute');

    if (diffInMinutes < 0 && Math.abs(diffInMinutes) <= 30) return 'ongoing'; // Current programme
    if (diffInMinutes > 0 && diffInMinutes <= 30) return 'upcoming'; // Upcoming programme
    if (diffInMinutes < 0) return 'past'; // Past programme
    return 'default'; // Future or irrelevant programme
  };

  const circleColors: Record<string, string> = {
    ongoing: '#4caf50', // Green for ongoing
    upcoming: '#2196f3', // Blue for upcoming
    past: '#9e9e9e', // Grey for past
    default: '#9e9e9e', // Default gray for irrelevant or future
  };

  return (
    <DashboardCard title="Programme Schedule">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef',
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {schedules.map((schedule) => {
          const { _id, programmeName, time, date, stage } = schedule;
          const status = getProgrammeStatus(time, date);

          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: status === 'ongoing' ? 1.1 : 1,
                transition: { duration: 0.5 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <TimelineItem>
                <TimelineOppositeContent>
                  {dayjs(`${date}T${time}`).format('hh:mm A')}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <motion.div
                    animate={{
                      scale: status === 'ongoing' ? [1, 1.2, 1] : 1, // Pulsing effect for ongoing
                      transition: { duration: 1, repeat: Infinity, repeatType: 'loop' },
                    }}
                  >
                    <TimelineDot
                      variant="outlined"
                      sx={{
                        borderColor: circleColors[status], // Applying color based on status
                        borderWidth: '3px',
                        backgroundColor: status === 'ongoing' ? 'transparent' : '#fff',
                        height: '20px',
                        width: '20px',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </motion.div>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      color: status === 'ongoing' ? '#007bff' : '#000',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      fontWeight="normal" // Keep font weight normal for all statuses
                      fontSize="1rem" // Consistent font size for all
                    >
                      {programmeName} at Stage {stage}
                    </Typography>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            </motion.div>
          );
        })}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
