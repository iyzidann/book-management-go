package main

import (
	"book-ddd/internal/config"
	"book-ddd/internal/handlers"
)

func main() {
	config.ConnectDB()

	app := handlers.SetupRoutes(config.DB)
	app.Listen(":8080")
}
