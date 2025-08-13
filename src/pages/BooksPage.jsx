import React from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
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
        <Container className="mt-4">
            <Notification notification={notification} />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Book Management</h1>
                <Button variant="primary" onClick={() => handleOpen()}>
                    Add New Book
                </Button>
            </div>
            
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <BookTable 
                        books={books} 
                        handleOpen={handleOpen} 
                        handleDelete={handleDelete}
                        pagination={pagination} 
                    />
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.total}
                        itemsPerPage={pagination.limit}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleLimitChange}
                    />
                </>
            )}
            
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
