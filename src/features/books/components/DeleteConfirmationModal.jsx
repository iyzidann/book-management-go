import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm, book }) => {
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await handleConfirm();
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        if (!loading) {
            handleClose();
        }
    };

    return (
        <Dialog
            open={show}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            disableEscapeKeyDown={loading}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                <DeleteIcon />
                Delete Book
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 75,
                            bgcolor: 'error.main',
                            mx: 'auto',
                            mb: 2,
                            fontSize: '1.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {book?.title?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to delete this book?
                    </Typography>

                    {book && (
                        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2, mb: 2 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {book.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                by {book.author}
                            </Typography>
                        </Box>
                    )}

                    <Alert severity="warning" variant="outlined" sx={{ textAlign: 'left' }}>
                        <Typography variant="body2">
                            <strong>Warning:</strong> This action cannot be undone.
                            The book will be permanently removed from your library.
                        </Typography>
                    </Alert>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={loading}
                    fullWidth
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    disabled={loading}
                    fullWidth
                    startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
                >
                    {loading ? 'Deleting...' : 'Delete Book'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;