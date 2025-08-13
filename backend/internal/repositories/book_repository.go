package repositories

import (
	"book-ddd/internal/models"
	"gorm.io/gorm"
)

// BookRepository defines the interface for book data operations.
type BookRepository interface {
	FindAll() ([]models.Book, error)
	FindAllWithPagination(limit, offset int) ([]models.Book, int64, error)
	FindByID(id uint) (models.Book, error)
	Create(b models.Book) (models.Book, error)
	Update(b models.Book) (models.Book, error)
	Delete(id uint) error
}

type mysqlRepo struct {
	db *gorm.DB
}

// NewBookRepository creates a new instance of the book repository.
func NewBookRepository(db *gorm.DB) BookRepository {
	return &mysqlRepo{db}
}

func (r *mysqlRepo) FindAll() ([]models.Book, error) {
	var books []models.Book
	err := r.db.Find(&books).Error
	return books, err
}

func (r *mysqlRepo) FindAllWithPagination(limit, offset int) ([]models.Book, int64, error) {
	var books []models.Book
	var total int64

	// Count total records
	err := r.db.Model(&models.Book{}).Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	// Get paginated results
	err = r.db.Offset(offset).Limit(limit).Find(&books).Error
	if err != nil {
		return nil, 0, err
	}

	return books, total, nil
}

func (r *mysqlRepo) FindByID(id uint) (models.Book, error) {
	var b models.Book
	err := r.db.First(&b, id).Error
	return b, err
}

func (r *mysqlRepo) Create(b models.Book) (models.Book, error) {
	err := r.db.Create(&b).Error
	return b, err
}

func (r *mysqlRepo) Update(b models.Book) (models.Book, error) {
	err := r.db.Save(&b).Error
	return b, err
}

func (r *mysqlRepo) Delete(id uint) error {
	return r.db.Delete(&models.Book{}, id).Error
}
