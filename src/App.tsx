import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import InternalResources from './pages/InternalResources';
import ExternalResources from './pages/ExternalResources';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internal-resources" element={<InternalResources />} />
          <Route path="/external-resources" element={<ExternalResources />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
