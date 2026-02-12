import React from 'react';
import { Box, Typography, Container, Grid, Link, List, ListItem, ListItemText, Divider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Trophy, ExternalLink } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { externalResources } from '../data/externalResources';

const ChartCard: React.FC<{ title: string; source?: string; items: any[] }> = ({ title, source, items }) => (
  <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ p: 3, borderBottom: `1px solid ${alpha('#000', 0.05)}` }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      {source && (
        <Typography variant="caption" color="text.secondary">
          Source: {source}
        </Typography>
      )}
    </Box>
    <List sx={{ flexGrow: 1, py: 0 }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            sx={{
              py: 2,
              px: 3,
              '&:hover': { background: alpha('#007AFF', 0.02) },
              transition: 'background 0.2s ease',
            }}
          >
            <Box
              sx={{
                mr: 2,
                minWidth: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: index < 3 ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' : alpha('#000', 0.05),
                color: index < 3 ? 'white' : 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              {index + 1}
            </Box>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  {item.link && (
                    <Link href={item.link} target="_blank" rel="noopener" color="inherit" sx={{ opacity: 0.3, '&:hover': { opacity: 1 } }}>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </Box>
              }
              secondary={item.description}
              secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
            />
          </ListItem>
          {index < items.length - 1 && <Divider component="li" sx={{ opacity: 0.5 }} />}
        </React.Fragment>
      ))}
    </List>
  </GlassCard>
);

const ExternalResources: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Trophy size={32} color="#FFD700" />
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          External AI Resources
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title={externalResources.models.title}
            source={externalResources.models.source}
            items={externalResources.models.items}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title={externalResources.ides.title}
            items={externalResources.ides.items}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title={externalResources.providers.title}
            items={externalResources.providers.items}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title={externalResources.cli.title}
            items={externalResources.cli.items}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExternalResources;
