import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

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
        <Modal 
            show={open} 
            onHide={onClose}
            backdrop={loading ? 'static' : true}
            keyboard={!loading}
            centered
        >
            <Modal.Header closeButton={!loading}>
                <Modal.Title className="d-flex align-items-center gap-2">
                    <span>{book && book.id ? 'Edit Book' : 'Add New Book'}</span>
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="px-4 py-4">
                {error && (
                    <Alert variant="danger" className="mb-3">
                        <small>{error}</small>
                    </Alert>
                )}
                
                <Form onKeyPress={handleKeyPress}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                            Book Title <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the book title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            autoFocus
                            className="form-control-lg"
                            style={{ fontSize: '1rem' }}
                        />
                        <Form.Text className="text-muted">
                            Enter the full title of the book
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                            Author Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the author's name..."
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            disabled={loading}
                            className="form-control-lg"
                            style={{ fontSize: '1rem' }}
                        />
                        <Form.Text className="text-muted">
                            Enter the author's full name
                        </Form.Text>
                    </Form.Group>
                </Form>

                {/* Preview */}
                {(title || author) && (
                    <div className="border rounded-3 p-3 bg-light">
                        <small className="text-muted d-block mb-2">Preview:</small>
                        <div className="d-flex align-items-center gap-3">
                            <div 
                                className="d-flex align-items-center justify-content-center text-white rounded fw-bold"
                                style={{
                                    width: '50px',
                                    height: '65px',
                                    backgroundColor: '#6366f1',
                                    fontSize: '1.5rem'
                                }}
                            >
                                {title.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                                <div className="fw-semibold">{title || 'Book Title'}</div>
                                <div className="text-muted small">
                                    {author ? `by ${author}` : 'by Author Name'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            
            <Modal.Footer className="border-top-0 px-4 pb-4">
                <Button 
                    variant="outline-secondary" 
                    onClick={onClose}
                    disabled={loading}
                    className="px-4"
                >
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={onSave}
                    disabled={loading || !title.trim() || !author.trim()}
                    className="px-4 d-flex align-items-center gap-2"
                >
                    {loading && (
                        <span className="spinner-border spinner-border-sm" role="status" />
                    )}
                    {loading ? 'Saving...' : 'Save Book'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookForm;