import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookTable = ({ books, handleOpen, handleDelete, pagination }) => {
    const navigate = useNavigate();

    // Generate consistent color for book initial
    const getBookColor = (title) => {
        const colors = [
            '#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', 
            '#f59e0b', '#ef4444', '#84cc16', '#3b82f6', '#6366f1'
        ];
        
        const hash = title?.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0) || 0;
        
        return colors[Math.abs(hash) % colors.length];
    };

    if (!books || books.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-3" style={{ fontSize: '4rem', opacity: 0.3 }}>📚</div>
                <h5 className="text-muted mb-2">No books found</h5>
                <p className="text-muted">Add your first book to get started!</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <Table hover className="align-middle mb-0">
                <thead>
                    <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ width: '80px', padding: '1rem 0.75rem' }} className="text-muted fw-semibold">
                            No
                        </th>
                        <th style={{ padding: '1rem 0.75rem' }} className="text-muted fw-semibold">
                            Book
                        </th>
                        <th style={{ width: '280px', padding: '1rem 0.75rem' }} className="text-end text-muted fw-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        const itemNumber = ((pagination.page - 1) * pagination.limit) + index + 1;
                        return (
                            <tr key={book.id} className="border-0" style={{ borderBottom: '1px solid #f8f9fa' }}>
                                <td style={{ padding: '1.25rem 0.75rem' }}>
                                    <Badge bg="light" text="muted" className="fs-6 fw-normal px-2">
                                        {itemNumber}
                                    </Badge>
                                </td>
                                <td style={{ padding: '1.25rem 0.75rem' }}>
                                    <div className="d-flex align-items-center">
                                        {/* Mini book cover */}
                                        <div 
                                            className="d-flex align-items-center justify-content-center text-white rounded me-3 flex-shrink-0"
                                            style={{
                                                width: '40px',
                                                height: '50px',
                                                backgroundColor: getBookColor(book.title),
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {book.title?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div className="min-width-0">
                                            <div className="fw-semibold text-dark mb-1" style={{ fontSize: '1rem' }}>
                                                {book.title}
                                            </div>
                                            <div className="text-muted small">
                                                by {book.author}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-end" style={{ padding: '1.25rem 0.75rem' }}>
                                    <div className="d-flex gap-2 justify-content-end">
                                        <Button 
                                            variant="primary" 
                                            size="sm" 
                                            className="px-3 d-flex align-items-center gap-1"
                                            onClick={() => navigate(`/books/${book.id}`)}
                                            title="View Details"
                                        >
                                            View
                                        </Button>
                                        <Button 
                                            variant="warning" 
                                            size="sm" 
                                            className="px-3 d-flex align-items-center gap-1" 
                                            onClick={() => handleOpen(book)}
                                            title="Edit Book"
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            className="px-3 d-flex align-items-center gap-1"
                                            onClick={() => handleDelete(book.id)}
                                            title="Delete Book"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default BookTable;