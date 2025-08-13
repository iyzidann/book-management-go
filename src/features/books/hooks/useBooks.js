import { useState, useEffect } from 'react';
import BookService from '../../../api/BookService';

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', variant: 'success' });

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getBooks().then(response => {
            setBooks(response.data || []);
        }).catch(error => {
            showNotification(`Error fetching books: ${error.message}`, 'danger');
            setBooks([]);
        });
    };

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
            loadBooks();
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
        setNotification,
        handleOpen,
        handleClose,
        handleSave,
        handleDelete,
        confirmDelete,
        closeDeleteConfirm
    };
};
