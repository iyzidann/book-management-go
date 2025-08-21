import React from 'react';
import { Container, Button, Spinner, Card, Row, Col } from 'react-bootstrap';
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
        <Container className="mt-4 mb-5">
            <Notification notification={notification} />
            
            {/* Header Section */}
            <div className="mb-4">
                <Row className="align-items-center">
                    <Col>
                        <div className="d-flex align-items-center gap-3 mb-2">
                            <div>
                                <h1 className="mb-1" style={{ fontSize: '2rem', fontWeight: '700' }}>
                                    Book Management
                                </h1>
                                <p className="text-muted mb-0">
                                    Manage your book collection with ease
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs="auto">
                        <Button 
                            variant="primary" 
                            onClick={() => handleOpen()}
                            className="d-flex align-items-center gap-2 px-3"
                            style={{ 
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)'
                            }}
                        >
                            <span>+</span>
                            Add New Book
                        </Button>
                    </Col>
                </Row>
                
                {/* Stats Card */}
                {!loading && (
                    <Card className="border-0 shadow-sm mt-4" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)' }}>
                        <Card.Body className="py-3">
                            <Row className="text-center">
                                <Col md={4}>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <span style={{ fontSize: '1.2rem' }}></span>
                                        <div>
                                            <div className="fw-bold text-primary" style={{ fontSize: '1.5rem' }}>
                                                {pagination.total || 0}
                                            </div>
                                            <small className="text-muted">Total Books</small>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <span style={{ fontSize: '1.2rem' }}></span>
                                        <div>
                                            <div className="fw-bold text-success" style={{ fontSize: '1.5rem' }}>
                                                {pagination.page || 1}
                                            </div>
                                            <small className="text-muted">Current Page</small>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <span style={{ fontSize: '1.2rem' }}></span>
                                        <div>
                                            <div className="fw-bold text-info" style={{ fontSize: '1.5rem' }}>
                                                {pagination.totalPages || 1}
                                            </div>
                                            <small className="text-muted">Total Pages</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}
            </div>
            
            {/* Content Section */}
            {loading ? (
                <Card className="border-0 shadow-sm">
                    <Card.Body className="text-center py-5">
                        <Spinner 
                            animation="border" 
                            role="status"
                            style={{ 
                                width: '3rem', 
                                height: '3rem',
                                color: '#6366f1'
                            }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-3 text-muted mb-0">Loading your book collection...</p>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                        <BookTable 
                            books={books} 
                            handleOpen={handleOpen} 
                            handleDelete={handleDelete}
                            pagination={pagination} 
                        />
                    </Card.Body>
                    {books && books.length > 0 && (
                        <Card.Footer className="bg-white border-0 pt-0">
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                totalItems={pagination.total}
                                itemsPerPage={pagination.limit}
                                onPageChange={handlePageChange}
                                onItemsPerPageChange={handleLimitChange}
                            />
                        </Card.Footer>
                    )}
                </Card>
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