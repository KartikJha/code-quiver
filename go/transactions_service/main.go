package main

import (
	"context"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// Database pool instance
var db *pgxpool.Pool

// Transaction struct defines the structure of a transaction
type Transaction struct {
	Amount   float64 `json:"amount"`
	Type     string  `json:"type"`
	ParentID *int64  `json:"parent_id,omitempty"`
}

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

// Setup routes for the application
func setupRoutes(app *fiber.App) {
	app.Put("/transactionservice/transaction/:transaction_id", createOrUpdateTransactionHandler)
	app.Get("/transactionservice/transaction/:transaction_id", getTransactionHandler)
	app.Get("/transactionservice/types/:type", getTransactionsByTypeHandler)
	app.Get("/transactionservice/sum/:transaction_id", getTransactionSumHandler)
}

// Helper function to fetch environment variables with a default fallback
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// Handlers

// Create or update a transaction
func createOrUpdateTransactionHandler(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	var transaction Transaction
	if err := c.BodyParser(&transaction); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid payload"})
	}

	err = createOrUpdateTransaction(transactionID, transaction)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save transaction"})
	}

	return c.JSON(fiber.Map{"status": "ok"})
}

// Get a transaction by ID
func getTransactionHandler(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	transaction, err := getTransaction(transactionID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Transaction not found"})
	}

	return c.JSON(transaction)
}

// Get all transaction IDs by type
func getTransactionsByTypeHandler(c *fiber.Ctx) error {
	transactionType := c.Params("type")

	ids, err := getTransactionsByType(transactionType)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch transactions"})
	}

	return c.JSON(ids)
}

// Get the sum of a transaction and its children
func getTransactionSumHandler(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	sum, err := getTransactionSum(transactionID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to calculate sum"})
	}

	return c.JSON(fiber.Map{"sum": sum})
}

// Business Logic

// Create or update a transaction in the database
func createOrUpdateTransaction(id int64, transaction Transaction) error {
	query := `
		INSERT INTO transactions (id, amount, type, parent_id)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (id) DO UPDATE 
		SET amount = EXCLUDED.amount, type = EXCLUDED.type, parent_id = EXCLUDED.parent_id`
	_, err := db.Exec(context.Background(), query, id, transaction.Amount, transaction.Type, transaction.ParentID)
	return err
}

// Get a transaction by ID from the database
func getTransaction(id int64) (Transaction, error) {
	var transaction Transaction
	query := `SELECT amount, type, parent_id FROM transactions WHERE id = $1`
	err := db.QueryRow(context.Background(), query, id).Scan(&transaction.Amount, &transaction.Type, &transaction.ParentID)
	return transaction, err
}

// Get all transaction IDs by type from the database
func getTransactionsByType(transactionType string) ([]int64, error) {
	var ids []int64
	query := `SELECT id FROM transactions WHERE type = $1`
	rows, err := db.Query(context.Background(), query, transactionType)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var id int64
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		ids = append(ids, id)
	}
	return ids, nil
}

// Get the sum of a transaction and its descendants
func getTransactionSum(id int64) (float64, error) {
	var sum float64
	query := `
		WITH RECURSIVE transaction_tree AS (
			SELECT id, amount FROM transactions WHERE id = $1
			UNION ALL
			SELECT t.id, t.amount FROM transactions t
			INNER JOIN transaction_tree tt ON t.parent_id = tt.id
		)
		SELECT COALESCE(SUM(amount), 0) FROM transaction_tree`
	err := db.QueryRow(context.Background(), query, id).Scan(&sum)
	return sum, err
}
