import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Badge,
    Popover,
    List,
    ListItem,
    ListItemText,
    Divider,
    alpha,
    CircularProgress,
} from '@mui/material';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface Feedback {
    id: string;
    content: string;
    name: string;
    created_at: string;
}

const API_URL = 'http://localhost:8000/feedback';

const FeedbackWidget: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [newFeedback, setNewFeedback] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        setFetching(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Failed to fetch feedbacks:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFeedback.trim() || !authorName.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newFeedback,
                    name: authorName,
                }),
            });

            if (response.ok) {
                setNewFeedback('');
                fetchFeedbacks();
            }
        } catch (error) {
            console.error('Error posting feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'feedback-popover' : undefined;

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <IconButton
                        aria-describedby={id}
                        onClick={handleClick}
                        sx={{
                            width: 56,
                            height: 56,
                            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                            color: 'white',
                            boxShadow: '0 8px 24px rgba(0, 122, 255, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #0063CC 0%, #4D4AC7 100%)',
                            },
                        }}
                    >
                        <Badge badgeContent={feedbacks.length} color="error">
                            <MessageSquare size={24} />
                        </Badge>
                    </IconButton>
                </motion.div>
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: 350,
                        maxHeight: 500,
                        borderRadius: 4,
                        mt: -2,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        background: 'transparent',
                        overflow: 'visible',
                    },
                }}
            >
                <GlassCard sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: alpha('#007AFF', 0.05) }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Community Feedback</Typography>
                        <IconButton size="small" onClick={handleClose}><X size={18} /></IconButton>
                    </Box>

                    <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto', maxHeight: 300 }}>
                        {fetching ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={24} /></Box>
                        ) : (
                            <List sx={{ p: 0 }}>
                                {feedbacks.length === 0 ? (
                                    <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>No feedback yet. Be the first!</Typography>
                                ) : (
                                    feedbacks.map((f, i) => (
                                        <React.Fragment key={f.id}>
                                            <ListItem sx={{ px: 0, py: 1 }}>
                                                <ListItemText
                                                    primary={f.name}
                                                    secondary={f.content}
                                                    primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
                                                    secondaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                                                />
                                            </ListItem>
                                            {i < feedbacks.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))
                                )}
                            </List>
                        )}
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Your Name"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Share your thoughts..."
                                value={newFeedback}
                                onChange={(e) => setNewFeedback(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading || !newFeedback.trim() || !authorName.trim()}
                                sx={{ minWidth: 48, p: 1 }}
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : <Send size={20} />}
                            </Button>
                        </Box>
                    </Box>
                </GlassCard>
            </Popover>
        </>
    );
};

export default FeedbackWidget;
