import { useState, useEffect, useCallback } from 'react';
import BookService from '../../../api/BookService';

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });
    
    // Pagination state
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    });
    const [loading, setLoading] = useState(false);

    const loadBooks = useCallback((page = 1, limit = 10) => {
        setLoading(true);
        BookService.getBooks(page, limit)
            .then(response => {
                const { data, total, page: currentPage, limit: currentLimit, total_pages } = response.data;
                setBooks(data || []);
                setPagination({
                    page: currentPage,
                    limit: currentLimit,
                    total,
                    totalPages: total_pages
                });
            })
            .catch(error => {
                showNotification(`Error fetching books: ${error.message}`, 'danger');
                setBooks([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const showNotification = (message, variant = 'success') => {
        setNotification({ show: true, message, variant });
        setTimeout(() => {
            setNotification({ show: false, message: '', variant: 'success' });
        }, 3000);
    };

    const handleOpen = (book = null) => {
        setCurrentBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentBook(null);
    };

    const handleSave = (book) => {
        const savePromise = book.id
            ? BookService.updateBook(book.id, { title: book.title, author: book.author })
            : BookService.createBook({ title: book.title, author: book.author });

        savePromise.then(() => {
            loadBooks(pagination.page, pagination.limit);
            showNotification(`Book ${book.id ? 'updated' : 'created'} successfully!`, 'success');
        }).catch(error => {
            showNotification(`Error saving book: ${error.message}`, 'danger');
        });

        handleClose();
    };

    const handleDelete = (id) => {
        setBookToDelete(id);
        setShowDeleteConfirm(true);
    };
    
    const handlePageChange = (newPage) => {
        loadBooks(newPage, pagination.limit);
    };
    
    const handleLimitChange = (newLimit) => {
        loadBooks(1, newLimit);
    };

    const confirmDelete = () => {
        BookService.deleteBook(bookToDelete).then(() => {
            loadBooks();
            showNotification('Book deleted successfully!', 'success');
        }).catch(error => {
            showNotification(`Error deleting book: ${error.message}`, 'danger');
        });
        setShowDeleteConfirm(false);
        setBookToDelete(null);
    };

    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        setBookToDelete(null);
    };

    return {
        books,
        open,
        currentBook,
        showDeleteConfirm,
        notification,
        loading,
        pagination,
        loadBooks,
        handleOpen,
        handleClose,
        handleSave,
        handleDelete,
        handlePageChange,
        handleLimitChange,
        confirmDelete,
        closeDeleteConfirm
    };
};
