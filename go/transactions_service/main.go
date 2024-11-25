package main

import (
	"context"
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

type Transaction struct {
	Amount   float64 `json:"amount"`
	Type     string  `json:"type"`
	ParentID *int64  `json:"parent_id,omitempty"`
}

func main() {
	// Initialize Fiber app
	app := fiber.New()

	// Connect to PostgreSQL
	var err error
	db, err = pgxpool.New(context.Background(), "postgres://postgres:your_new_password@localhost:5432/transactions_db")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer db.Close()

	// API Routes
	app.Put("/transactionservice/transaction/:transaction_id", createOrUpdateTransaction)
	app.Get("/transactionservice/transaction/:transaction_id", getTransaction)
	app.Get("/transactionservice/types/:type", getTransactionsByType)
	app.Get("/transactionservice/sum/:transaction_id", getTransactionSum)

	// Start server
	log.Fatal(app.Listen(":8080"))
}

func createOrUpdateTransaction(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	var transaction Transaction
	if err := c.BodyParser(&transaction); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid payload"})
	}

	query := `INSERT INTO transactions (id, amount, type, parent_id)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (id) DO UPDATE 
              SET amount = EXCLUDED.amount, type = EXCLUDED.type, parent_id = EXCLUDED.parent_id`
	_, err = db.Exec(context.Background(), query, transactionID, transaction.Amount, transaction.Type, transaction.ParentID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save transaction"})
	}

	return c.JSON(fiber.Map{"status": "ok"})
}

func getTransaction(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	var transaction Transaction
	query := `SELECT amount, type, parent_id FROM transactions WHERE id = $1`
	err = db.QueryRow(context.Background(), query, transactionID).Scan(&transaction.Amount, &transaction.Type, &transaction.ParentID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Transaction not found"})
	}

	return c.JSON(transaction)
}

func getTransactionsByType(c *fiber.Ctx) error {
	transactionType := c.Params("type")

	var ids []int64
	query := `SELECT id FROM transactions WHERE type = $1`
	rows, err := db.Query(context.Background(), query, transactionType)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch transactions"})
	}
	defer rows.Close()

	for rows.Next() {
		var id int64
		if err := rows.Scan(&id); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to parse transaction"})
		}
		ids = append(ids, id)
	}

	return c.JSON(ids)
}

func getTransactionSum(c *fiber.Ctx) error {
	transactionID, err := strconv.ParseInt(c.Params("transaction_id"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid transaction ID"})
	}

	var sum float64
	query := `
		WITH RECURSIVE transaction_tree AS (
			SELECT id, amount FROM transactions WHERE id = $1
			UNION ALL
			SELECT t.id, t.amount FROM transactions t
			INNER JOIN transaction_tree tt ON t.parent_id = tt.id
		)
		SELECT COALESCE(SUM(amount), 0) FROM transaction_tree`
	err = db.QueryRow(context.Background(), query, transactionID).Scan(&sum)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to calculate sum"})
	}

	return c.JSON(fiber.Map{"sum": sum})
}
