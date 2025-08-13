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

func (h *BookHandler) GetBooks(c *fiber.Ctx) error {
	books, err := h.service.GetBooks()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(books)
}

func (h *BookHandler) GetBook(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
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
