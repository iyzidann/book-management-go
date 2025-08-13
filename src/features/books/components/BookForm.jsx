import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const BookForm = ({ open, handleClose, handleSave, book }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            if (book) {
                setTitle(book.title || '');
                setAuthor(book.author || '');
            } else {
                setTitle('');
                setAuthor('');
            }
            setError(''); // Clear error when modal opens
        }
    }, [book, open]);

    const onSave = () => {
        if (!title || !author) {
            setError('Title and Author cannot be empty!');
            return;
        }
        handleSave({ ...book, title, author });
    };

    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{book && book.id ? 'Edit Book' : 'Add New Book'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookForm;
