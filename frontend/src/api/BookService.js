import axios from 'axios';

const API_URL = 'http://localhost:8080/books';

const getBooks = (page = 1, limit = 10) => {
    return axios.get(API_URL, {
        params: {
            page,
            limit
        }
    });
};

const getBook = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createBook = (book) => {
    return axios.post(API_URL, book);
};

const updateBook = (id, book) => {
    return axios.put(`${API_URL}/${id}`, book);
};

const deleteBook = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


const BookService = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    getBooksWithPagination: getBooks // Alias for backward compatibility
};

export default BookService;
