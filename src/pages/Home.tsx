import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Button, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Rocket, ChevronRight, Megaphone } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import QASection from '../components/QASection';
import { Link as RouterLink } from 'react-router-dom';

const BannerSection = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  position: 'relative',
}));

const SloganText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '-0.04em',
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #1D1D1F 0%, #434345 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
}));

const topics = [
  {
    icon: <Brain size={32} color="#007AFF" />,
    title: 'Generative AI',
    description: 'Explore the latest in LLMs, image generation, and multi-modal AI capabilities.',
  },
  {
    icon: <Code size={32} color="#5856D6" />,
    title: 'AI Development',
    description: 'Resources and tools for building, deploying, and optimizing AI-powered applications.',
  },
  {
    icon: <Rocket size={32} color="#FF2D55" />,
    title: 'Internal Innovation',
    description: 'Discover how we are bridging world-class AI ecosystems with our internal solutions.',
  },
];

const Home: React.FC = () => {
  const [latestBroadcast, setLatestBroadcast] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/feedback')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setLatestBroadcast(data[0].content);
        }
      })
      .catch((err) => console.error('Failed to fetch broadcast:', err));
  }, []);

  return (
    <Box>
      {latestBroadcast && (
        <Box
          sx={{
            background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 100%)',
            color: 'white',
            py: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          <Megaphone size={16} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Broadcast: {latestBroadcast}
          </Typography>
        </Box>
      )}
      <BannerSection>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SloganText variant="h1">
              Empowering our colleagues with AI toolings, resources and knowledge.
            </SloganText>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                margin: '0 auto',
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              A centralized gateway bridging the world-class AI ecosystem with our internal innovations.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/internal-resources"
                variant="contained"
                size="large"
                endIcon={<ChevronRight size={18} />}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Internal Resources
              </Button>
              <Button
                component={RouterLink}
                to="/external-resources"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: alpha('#000', 0.1),
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: alpha('#000', 0.2),
                    background: alpha('#000', 0.02),
                  },
                }}
              >
                External Resources
              </Button>
            </Box>
          </motion.div>
        </Container>
      </BannerSection>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>
          {topics.map((topic, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <GlassCard
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '12px',
                      background: alpha('#FFFFFF', 0.5),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {topic.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {topic.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {topic.description}
                  </Typography>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <QASection />

      {/* Decorative Sparkles */}
      <Box
        sx={{
          position: 'fixed',
          top: '20%',
          left: '10%',
          opacity: 0.3,
          zIndex: -1,
          animation: 'pulse 4s infinite ease-in-out',
        }}
      >
        <Sparkles size={40} color="#007AFF" />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '15%',
          right: '8%',
          opacity: 0.2,
          zIndex: -1,
          animation: 'pulse 5s infinite ease-in-out',
        }}
      >
        <Sparkles size={60} color="#5856D6" />
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.2); opacity: 0.4; }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
