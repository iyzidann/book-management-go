package services

import (
	"book-ddd/internal/models"
	"book-ddd/internal/repositories"
)

// BookService defines the interface for book business logic.
type BookService interface {
	GetBooks() ([]models.Book, error)
	GetBook(id uint) (models.Book, error)
	CreateBook(book models.Book) (models.Book, error)
	UpdateBook(book models.Book) (models.Book, error)
	DeleteBook(id uint) error
}

type bookService struct {
	repo repositories.BookRepository
}

// NewBookService creates a new instance of the book service.
func NewBookService(r repositories.BookRepository) BookService {
	return &bookService{r}
}

func (s *bookService) GetBooks() ([]models.Book, error) {
	return s.repo.FindAll()
}

func (s *bookService) GetBook(id uint) (models.Book, error) {
	return s.repo.FindByID(id)
}

func (s *bookService) CreateBook(book models.Book) (models.Book, error) {
	return s.repo.Create(book)
}

func (s *bookService) UpdateBook(book models.Book) (models.Book, error) {
	return s.repo.Update(book)
}

func (s *bookService) DeleteBook(id uint) error {
	return s.repo.Delete(id)
}
