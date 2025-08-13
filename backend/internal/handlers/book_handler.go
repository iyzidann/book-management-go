package handlers

import (
	"book-ddd/internal/models"
	"book-ddd/internal/services"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type BookHandler struct {
	service services.BookService
}

func NewBookHandler(s services.BookService) *BookHandler {
	return &BookHandler{s}
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Total      int64       `json:"total"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
}

func (h *BookHandler) GetBooks(c *fiber.Ctx) error {
	// Default values
	page, _ := strconv.Atoi(c.Query("page", "1"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(c.Query("limit", "10"))
	switch {
	case limit > 100:
		limit = 100
	case limit <= 0:
		limit = 10
	}
	offset := (page - 1) * limit

	// Check if pagination is requested
	if c.Query("page") != "" || c.Query("limit") != "" {
		books, total, err := h.service.GetBooksWithPagination(limit, offset)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		totalPages := int((total + int64(limit) - 1) / int64(limit))

		response := PaginatedResponse{
			Data:       books,
			Total:      total,
			Page:       page,
			Limit:      limit,
			TotalPages: totalPages,
		}

		return c.JSON(response)
	}

	// Fallback to get all books if no pagination params
	books, err := h.service.GetBooks()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"data": books})
}

func (h *BookHandler) GetBook(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid book ID"})
	}

	book, err := h.service.GetBook(uint(id))
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}
	return c.JSON(book)
}

func (h *BookHandler) CreateBook(c *fiber.Ctx) error {
	var b models.Book
	if err := c.BodyParser(&b); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	book, err := h.service.CreateBook(b)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(book)
}

func (h *BookHandler) UpdateBook(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var b models.Book
	if err := c.BodyParser(&b); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	b.ID = uint(id)
	book, err := h.service.UpdateBook(b)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(book)
}

func (h *BookHandler) DeleteBook(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	err := h.service.DeleteBook(uint(id))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Book deleted"})
}
