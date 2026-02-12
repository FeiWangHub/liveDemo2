import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
    Collapse,
    alpha,
    Container,
    Grid,
} from '@mui/material';
import { Send, MessageCircle, ChevronDown, ChevronUp, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

interface QAEntry {
    id: string;
    content: string;
    author_name: string;
    created_at: string;
    parent_id: string | null;
    answers: QAEntry[];
}

const API_URL = 'http://localhost:8000/qa';

const QASection: React.FC = () => {
    const [questions, setQuestions] = useState<QAEntry[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleSubmitQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim() || !authorName.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newQuestion,
                    author_name: authorName,
                    parent_id: null,
                }),
            });

            if (response.ok) {
                setNewQuestion('');
                fetchQuestions();
            }
        } catch (error) {
            console.error('Error posting question:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async (questionId: string) => {
        const text = answerText[questionId];
        if (!text?.trim() || !authorName.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: text,
                    author_name: authorName,
                    parent_id: questionId,
                }),
            });

            if (response.ok) {
                setAnswerText({ ...answerText, [questionId]: '' });
                fetchQuestions();
            }
        } catch (error) {
            console.error('Error posting answer:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 10 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                Community Q&A
            </Typography>

            <GlassCard sx={{ p: 4, mb: 6 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Ask a Question
                </Typography>
                <Box component="form" onSubmit={handleSubmitQuestion}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Your Name"
                                variant="outlined"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                sx={{ mb: 2 }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                label="What's on your mind?"
                                multiline
                                rows={2}
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                sx={{ mb: 2 }}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !newQuestion.trim() || !authorName.trim()}
                            startIcon={<Send size={18} />}
                        >
                            Post Question
                        </Button>
                    </Box>
                </Box>
            </GlassCard>

            <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                <AnimatePresence>
                    {questions.map((q) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                        >
                            <ListItem
                                alignItems="flex-start"
                                component={GlassCard}
                                sx={{
                                    mb: 2,
                                    flexDirection: 'column',
                                    p: 0,
                                    overflow: 'hidden',
                                    background: alpha('#FFFFFF', 0.6),
                                }}
                            >
                                <Box sx={{ p: 3, width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: alpha('#007AFF', 0.1), color: '#007AFF' }}>
                                            <User size={20} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {q.author_name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    {new Date(q.created_at).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                                                {q.content}
                                            </Typography>
                                        }
                                    />
                                    <IconButton onClick={() => toggleExpand(q.id)} sx={{ ml: 1 }}>
                                        {expandedId === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </IconButton>
                                </Box>

                                <Collapse in={expandedId === q.id} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                                    <Divider sx={{ mx: 3 }} />
                                    <Box sx={{ p: 3, bgcolor: alpha('#F2F2F7', 0.5) }}>
                                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <MessageCircle size={16} />
                                            Answers ({q.answers.length})
                                        </Typography>

                                        {q.answers.map((ans) => (
                                            <Box key={ans.id} sx={{ mb: 2, pl: 2, borderLeft: `2px solid ${alpha('#007AFF', 0.2)}` }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                                    {ans.author_name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {ans.content}
                                                </Typography>
                                            </Box>
                                        ))}

                                        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Write an answer..."
                                                size="small"
                                                value={answerText[q.id] || ''}
                                                onChange={(e) => setAnswerText({ ...answerText, [q.id]: e.target.value })}
                                                sx={{ background: 'white', borderRadius: 1 }}
                                            />
                                            <Button
                                                variant="contained"
                                                size="small"
                                                disabled={loading || !answerText[q.id]?.trim() || !authorName.trim()}
                                                onClick={() => handleSubmitAnswer(q.id)}
                                            >
                                                Reply
                                            </Button>
                                        </Box>
                                    </Box>
                                </Collapse>
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
        </Container>
    );
};

export default QASection;
