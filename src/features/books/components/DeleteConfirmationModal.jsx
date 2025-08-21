import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

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
        <Modal 
            show={show} 
            onHide={onClose}
            backdrop={loading ? 'static' : true}
            keyboard={!loading}
            centered
        >
            <Modal.Header closeButton={!loading} className="border-0 pb-0">
                <Modal.Title className="d-flex align-items-center gap-2 text-danger">
                    <span style={{ fontSize: '1.5rem' }}></span>
                    Delete Book
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="px-4 py-3">
                <div className="text-center mb-3">
                    <div 
                        className="d-inline-flex align-items-center justify-content-center text-white rounded mb-3"
                        style={{
                            width: '60px',
                            height: '75px',
                            backgroundColor: '#dc3545',
                            fontSize: '1.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {book?.title?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                </div>

                <div className="text-center">
                    <h6 className="mb-2">Are you sure you want to delete this book?</h6>
                    
                    {book && (
                        <div className="bg-light rounded p-3 mb-3">
                            <div className="fw-semibold text-dark">{book.title}</div>
                            <div className="text-muted small">by {book.author}</div>
                        </div>
                    )}

                    <Alert variant="warning" className="text-start py-2 px-3">
                        <small>
                            <strong>Warning:</strong> This action cannot be undone. 
                            The book will be permanently removed from your library.
                        </small>
                    </Alert>
                </div>
            </Modal.Body>
            
            <Modal.Footer className="border-0 pt-0 px-4 pb-4">
                <div className="d-flex gap-2 w-100">
                    <Button 
                        variant="outline-secondary" 
                        onClick={onClose}
                        disabled={loading}
                        className="flex-fill"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-fill d-flex align-items-center justify-content-center gap-2"
                    >
                        {loading && (
                            <span className="spinner-border spinner-border-sm" role="status" />
                        )}
                        {loading ? 'Deleting...' : 'Delete Book'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;