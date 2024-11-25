package main

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

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
