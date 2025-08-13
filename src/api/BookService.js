import axios from 'axios';

const API_URL = 'http://localhost:8080/books';

const getBooks = () => {
    return axios.get(API_URL);
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
    deleteBook
};

export default BookService;
