import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Card, Row, Col } from 'react-bootstrap';
import BookService from '../api/BookService';

const BookDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await BookService.getBook(id);
                setBook(response.data);
                setError('');
            } catch (err) {
                console.error('Error fetching book:', err);
                setError('Failed to load book details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/books');
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading book details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                    <div className="mt-3">
                        <Button variant="secondary" onClick={handleBack}>
                            Back to Books
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    Book not found.
                    <div className="mt-3">
                        <Button variant="secondary" onClick={handleBack}>
                            Back to Books
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h4" className="bg-light">
                    Book Details
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <div className="text-center mb-4">
                                <div 
                                    className="bg-primary text-white d-flex align-items-center justify-content-center rounded" 
                                    style={{ 
                                        width: '200px', 
                                        height: '280px', 
                                        margin: '0 auto',
                                        fontSize: '4rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {book.title?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                            </div>
                        </Col>
                        <Col md={9}>
                            <h2 className="display-5 mb-3">{book.title}</h2>
                            <p className="text-muted fs-4">by {book.author}</p>
                            
                        </Col>
                    </Row>
                    
                    <div className="mt-4">
                        <Button 
                            variant="outline-secondary" 
                            onClick={handleBack}
                            className="mb-4"
                        >
                            ← Back to Books
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookDetailPage;
