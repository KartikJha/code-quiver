package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var db *pgxpool.Pool

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Initialize Fiber app
	app := fiber.New()

	// Initialize database connection
	initDB()
	defer db.Close()

	// Set up routes
	setupRoutes(app)

	// Start server
	port := getEnv("SERVER_PORT", "8080")
	log.Printf("Server listening on port %s", port)
	log.Fatal(app.Listen(":" + port))
}

// Initialize PostgreSQL connection
func initDB() {
	dsn := getEnv("DATABASE_URL", "postgres://postgres:your_new_password@localhost:5432/transactions_db")
	var err error
	db, err = pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	log.Println("Connected to the database")
}

// Set up application routes
func setupRoutes(app *fiber.App) {
	app.Put("/transactionservice/transaction/:transaction_id", createOrUpdateTransactionHandler)
	app.Get("/transactionservice/transaction/:transaction_id", getTransactionHandler)
	app.Get("/transactionservice/types/:type", getTransactionsByTypeHandler)
	app.Get("/transactionservice/sum/:transaction_id", getTransactionSumHandler)
}
