import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper,
  Avatar,
  CircularProgress,
} from '@mui/material';

const BookForm = ({ open, handleClose, handleSave, book }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            if (book) {
                setTitle(book.title || '');
                setAuthor(book.author || '');
            } else {
                setTitle('');
                setAuthor('');
            }
            setError('');
        }
    }, [book, open]);

    const validateForm = () => {
        if (!title.trim()) {
            setError('Title is required');
            return false;
        }
        if (!author.trim()) {
            setError('Author is required');
            return false;
        }
        if (title.trim().length < 2) {
            setError('Title must be at least 2 characters long');
            return false;
        }
        if (author.trim().length < 2) {
            setError('Author must be at least 2 characters long');
            return false;
        }
        return true;
    };

    const onSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            await handleSave({ 
                ...book, 
                title: title.trim(), 
                author: author.trim() 
            });
            
            // Reset form after successful save
            setTitle('');
            setAuthor('');
        } catch (err) {
            setError('Failed to save book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        if (!loading) {
            setTitle('');
            setAuthor('');
            setError('');
            handleClose();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            onSave();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            disableEscapeKeyDown={loading}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {book && book.id ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>

<DialogContent sx={{ pt: 3, pb: 2 }}>
  {error && (
    <Alert variant="outlined" severity="error" sx={{ mb: 3 }}>
      {error}
    </Alert>
  )}

  <TextField
    label="Book Title"
    placeholder="Enter the book title..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    onKeyPress={handleKeyPress}
    disabled={loading}
    autoFocus
    fullWidth
    margin="normal"   // 🔹 kasih margin bawaan MUI
    helperText="Enter the full title of the book"
    required
  />

  <TextField
    label="Author Name"
    placeholder="Enter the author's name..."
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    onKeyPress={handleKeyPress}
    disabled={loading}
    fullWidth
    margin="normal"   // 🔹 ini juga
    helperText="Enter the author's full name"
    required
  />

  {/* Preview */}
  {(title || author) && (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.50',
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 56,
            height: 72,
            bgcolor: 'grey.500', // abu-abu
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: 'white',
            borderRadius: 2,
          }}
        >
          {title.charAt(0).toUpperCase() || '?'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {title || 'Untitled Book'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author ? `by ${author}` : 'by Unknown Author'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )}
</DialogContent>

            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={loading || !title.trim() || !author.trim()}
                    startIcon={loading ? <CircularProgress size={16} /> : null}
                >
                    {loading ? 'Saving...' : 'Save Book'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookForm;