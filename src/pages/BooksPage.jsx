import React from 'react';
import {
  Container,
  Button,
  CircularProgress,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useBooks } from '../features/books/hooks/useBooks';
import BookForm from '../features/books/components/BookForm.jsx';
import BookTable from '../features/books/components/BookTable.jsx';
import Notification from '../components/common/Notification.jsx';
import DeleteConfirmationModal from '../features/books/components/DeleteConfirmationModal.jsx';
import Pagination from '../components/common/Pagination.jsx';

const BooksPage = () => {
  const {
    books,
    open,
    currentBook,
    showDeleteConfirm,
    notification,
    loading,
    pagination,
    handleOpen,
    handleClose,
    handleSave,
    handleDelete,
    handlePageChange,
    handleLimitChange,
    confirmDelete,
    closeDeleteConfirm
  } = useBooks();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Notification notification={notification} />

      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Book Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your book collection with ease
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          startIcon={<Add />}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 1.5,
            px: 2,
            py: 0.8,
            fontSize: '0.8rem',
            boxShadow: 'none',
            minWidth: 'auto',
            '&:hover': { bgcolor: '#222' },
          }}
        >
          Add
        </Button>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
          }}
        >
          <CircularProgress size={40} color="inherit" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Loading your book collection...
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
          }}
        >
          <BookTable
            books={books}
            handleOpen={handleOpen}
            handleDelete={handleDelete}
            pagination={pagination}
          />
          {books && books.length > 0 && (
            <Box sx={{ p: 2, pt: 0 }}>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleLimitChange}
              />
            </Box>
          )}
        </Paper>
      )}

      {/* Modals */}
      <BookForm
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        book={currentBook}
      />
      <DeleteConfirmationModal
        show={showDeleteConfirm}
        handleClose={closeDeleteConfirm}
        handleConfirm={confirmDelete}
        book={currentBook}
      />
    </Container>
  );
};

export default BooksPage;