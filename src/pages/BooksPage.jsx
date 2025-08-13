import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useBooks } from '../features/books/hooks/useBooks';
import BookForm from '../features/books/components/BookForm.jsx';
import BookTable from '../features/books/components/BookTable.jsx';
import Notification from '../components/common/Notification.jsx';
import DeleteConfirmationModal from '../features/books/components/DeleteConfirmationModal.jsx';

const BooksPage = () => {
    const {
        books,
        open,
        currentBook,
        showDeleteConfirm,
        notification,
        setNotification,
        handleOpen,
        handleClose,
        handleSave,
        handleDelete,
        confirmDelete,
        closeDeleteConfirm
    } = useBooks();

    return (
        <Container className="mt-4">
            <Notification notification={notification} setNotification={setNotification} />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Book Management</h1>
                <Button variant="primary" onClick={() => handleOpen()}>
                    Add New Book
                </Button>
            </div>
            <BookTable books={books} handleOpen={handleOpen} handleDelete={handleDelete} />
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
            />
        </Container>
    );
};

export default BooksPage;
