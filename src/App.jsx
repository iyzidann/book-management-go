import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import BooksPage from './pages/BooksPage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<Navigate to="/books" replace />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
