import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookTable = ({ books, handleOpen, handleDelete, pagination }) => {
    const navigate = useNavigate();
    return (
        <Table striped bordered hover className="align-middle">
            <thead className="table-light">
                <tr>
                    <th style={{width: '60px'}}>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th className="text-end" style={{width: '280px'}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    // Calculate the actual index based on pagination
                    const itemNumber = ((pagination.page - 1) * pagination.limit) + index + 1;
                    return (
                        <tr key={book.id}>
                            <td className="text-muted">{itemNumber}</td>
                            <td className="fw-semibold">{book.title}</td>
                            <td>{book.author}</td>
                            <td className="text-end">
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => navigate(`/books/${book.id}`)}
                                    title="View Details"
                                >
                                    <i className="bi bi-eye"></i> View
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2" 
                                    onClick={() => handleOpen(book)}
                                    title="Edit Book"
                                >
                                    <i className="bi bi-pencil"></i> Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(book.id)}
                                    title="Delete Book"
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default BookTable;
