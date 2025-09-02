import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookService from '../api/BookService';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await BookService.getBook(id);
        setBook(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleBack = () => navigate('/books');

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Loading book details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>{error}</Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Back to Books
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="warning" sx={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>
            Book not found.
          </Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Back to Books
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ textTransform: 'none' }}
        >
          Back
        </Button>
      </Box>

      {/* Book Detail Card */}
      <Card
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Book Cover */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                variant="rounded"
                sx={{
                  width: 160,
                  height: 220,
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  bgcolor: 'grey.200',
                  color: 'grey.800',
                  mx: 'auto',
                  borderRadius: 2
                }}
              >
                {book.title?.charAt(0)?.toUpperCase() || '?'}
              </Avatar>
            </Grid>

            {/* Book Information */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {book.author}
              </Typography>

              <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3, mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Book ID: #{id}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailPage;
