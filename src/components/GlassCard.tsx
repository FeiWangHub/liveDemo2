import { Card, CardProps } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

interface GlassCardProps extends CardProps {
  blur?: number;
  opacity?: number;
}

const GlassCard = styled(Card)<GlassCardProps>(({ blur = 20, opacity = 0.7 }) => ({
  background: alpha('#FFFFFF', opacity),
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: `1px solid ${alpha('#FFFFFF', 0.3)}`,
  boxShadow: `0 8px 32px 0 ${alpha('#1F2687', 0.08)}`,
  borderRadius: 24,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 48px 0 ${alpha('#1F2687', 0.15)}`,
    background: alpha('#FFFFFF', opacity + 0.1),
  },
}));

export default GlassCard;
