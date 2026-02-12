import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import FeedbackWidget from '../components/FeedbackWidget';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: 'linear-gradient(135deg, #F2F2F7 0%, #E5E5EA 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative backgrounds */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, rgba(0, 122, 255, 0) 70%)',
            filter: 'blur(50px)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(88, 86, 214, 0.1) 0%, rgba(88, 86, 214, 0) 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
      <FeedbackWidget />
    </Box>
  );
};

export default MainLayout;
