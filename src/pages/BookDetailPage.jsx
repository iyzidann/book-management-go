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

    // Generate consistent color based on title
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

    if (loading) {
        return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading book details...</p>
        </Container>
        );
    }

    if (error) {
        return (
        <Container className="mt-5">
            <Alert variant="danger" className="text-center">
            <p className="mb-3">{error}</p>
            <Button variant="outline-danger" onClick={handleBack}>
                ← Back to Books
            </Button>
            </Alert>
        </Container>
        );
    }

    if (!book) {
        return (
        <Container className="mt-5">
            <Alert variant="warning" className="text-center">
            <p className="mb-3">Book not found.</p>
            <Button variant="outline-warning" onClick={handleBack}>
                ← Back to Books
            </Button>
            </Alert>
        </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5" style={{ maxWidth: '800px' }}>
        {/* Back Button */}
        <div className="mb-4">
            <Button 
            variant="outline-secondary" 
            onClick={handleBack}
            className="d-flex align-items-center gap-2"
            >
            ← Back to Books
            </Button>
        </div>

        {/* Book Detail Card */}
        <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
            <Row className="align-items-center">
                {/* Book Cover */}
                <Col md={4} className="text-center mb-4 mb-md-0">
                <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 text-white shadow-sm"
                    style={{
                    width: '180px',
                    height: '240px',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    backgroundColor: getBookColor(book.title),
                    }}
                >
                    {book.title?.charAt(0)?.toUpperCase() || '?'}
                </div>
                </Col>

                {/* Book Information */}
                <Col md={8}>
                <div className="ps-md-4">
                    <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                    {book.title}
                    </h1>
                    
                    <h3 className="text-muted mb-4" style={{ fontSize: '1.5rem' }}>
                    by {book.author}
                    </h3>

                    <div className="border-top pt-4">
                    <small className="text-muted">Book ID: #{id}</small>
                    </div>
                </div>
                </Col>
            </Row>
            </Card.Body>
        </Card>
        </Container>
    );
};

export default BookDetailPage;