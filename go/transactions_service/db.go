package main

import (
	"context"
)

type Transaction struct {
	Amount   float64 `json:"amount"`
	Type     string  `json:"type"`
	ParentID *int64  `json:"parent_id,omitempty"`
}

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
