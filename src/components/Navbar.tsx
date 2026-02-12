import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Cpu } from 'lucide-react';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha('#FFFFFF', 0.8),
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderBottom: `1px solid ${alpha('#000000', 0.1)}`,
  boxShadow: 'none',
  color: theme.palette.text.primary,
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 400,
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: 1,
            }}
          >
            <Cpu size={24} color="#007AFF" />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ABC AI Community
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <NavButton
              component={RouterLink}
              to="/"
              active={location.pathname === '/'}
            >
              Home
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/internal-resources"
              active={location.pathname === '/internal-resources'}
            >
              Internal Resources
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/external-resources"
              active={location.pathname === '/external-resources'}
            >
              External Resources
            </NavButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
