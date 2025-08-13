import React from 'react';
import { Table, Button } from 'react-bootstrap';

const BookTable = ({ books, handleOpen, handleDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th className="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td className="text-end">
                            <Button variant="warning" className="me-2" onClick={() => handleOpen(book)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(book.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default BookTable;
