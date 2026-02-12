import React from 'react';
import { Box, Typography, Container, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ExternalLink, BookOpen, Layers, Database, FileText } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { internalTools } from '../data/internalTools';

const InternalResources: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
        Internal AI Resources
      </Typography>

      {/* AI Platform Big Card */}
      <GlassCard sx={{ p: 4, mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Layers size={32} color="#007AFF" />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            AI Platform
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 4, background: alpha('#007AFF', 0.05), height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Database size={24} color="#007AFF" />
                <Typography variant="h6">Modu Garden</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                A curated list of state-of-the-art AI models available for internal use and testing.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button size="small" variant="text" startIcon={<ExternalLink size={14} />}>
                  Explore
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 4, background: alpha('#5856D6', 0.05), height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Layers size={24} color="#5856D6" />
                <Typography variant="h6">rack studio</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Build and optimize your own Retrieval-Augmented Generation workflows.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="text" startIcon={<ExternalLink size={14} />}>
                  Link
                </Button>
                <Button size="small" variant="text" startIcon={<BookOpen size={14} />}>
                  Wiki
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 4, background: alpha('#FF2D55', 0.05), height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <FileText size={24} color="#FF2D55" />
                <Typography variant="h6">document intelligence</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Extract insights and structured data from your internal documents using AI.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="text" startIcon={<ExternalLink size={14} />}>
                  Docs
                </Button>
                <Button size="small" variant="text" startIcon={<BookOpen size={14} />}>
                  Wiki
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Internal Tools List */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Available Internal Toolings
      </Typography>
      <GlassCard sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: alpha('#000', 0.02) }}>
                <TableCell sx={{ fontWeight: 600 }}>Tool Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Links</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {internalTools.map((tool) => (
                <TableRow key={tool.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{tool.name}</TableCell>
                  <TableCell>{tool.owner}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Link href={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem' }}>
                        <ExternalLink size={14} /> Link
                      </Link>
                      <Link href={tool.wikiLink} underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem', color: 'secondary.main' }}>
                        <BookOpen size={14} /> Wiki
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', maxWidth: 300 }}>
                    {tool.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassCard>
    </Container>
  );
};

export default InternalResources;
