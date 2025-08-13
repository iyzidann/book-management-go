package handlers

import (
	"book-ddd/internal/repositories"
	"book-ddd/internal/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB) *fiber.App {
	app := fiber.New()

	app.Use(cors.New())

	repo := repositories.NewBookRepository(db)
	service := services.NewBookService(repo)
	handler := NewBookHandler(service)

	api := app.Group("/books")
	api.Get("/", handler.GetBooks)
	api.Get("/:id", handler.GetBook)
	api.Post("/", handler.CreateBook)
	api.Put("/:id", handler.UpdateBook)
	api.Delete("/:id", handler.DeleteBook)

	return app
}
