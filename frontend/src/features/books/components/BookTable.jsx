import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookTable = ({ books, handleOpen, handleDelete, pagination }) => {
  const navigate = useNavigate();

  if (!books || books.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography sx={{ fontSize: '3rem', opacity: 0.3 }}>📚</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No books found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first book to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 2, fontWeight: 'bold', color: 'text.secondary' }}>
              No
            </TableCell>
            <TableCell sx={{ py: 2, fontWeight: 'bold', color: 'text.secondary' }}>
              Book
            </TableCell>
            <TableCell sx={{ py: 2, fontWeight: 'bold', color: 'text.secondary', textAlign: 'right' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => {
            const itemNumber = ((pagination.page - 1) * pagination.limit) + index + 1;
            return (
              <TableRow
                key={book.id}
                sx={{
                  '&:hover': { bgcolor: 'grey.50' },
                  '& .MuiTableCell-root': { borderBottom: '1px solid #f0f0f0' }
                }}
              >
                <TableCell sx={{ py: 2 }}>{itemNumber}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 40,
                        height: 56,
                        bgcolor: 'grey.200',
                        color: 'grey.800',
                        fontWeight: 'bold',
                        mr: 2
                      }}
                    >
                      {book.title?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {book.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        by {book.author}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2, textAlign: 'right' }}>
                  <ButtonGroup size="small" variant="text">
                    <Button onClick={() => navigate(`/books/${book.id}`)}>View</Button>
                    <Button onClick={() => handleOpen(book)} color="inherit">Edit</Button>
                    <Button onClick={() => handleDelete(book.id)} color="error">Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;