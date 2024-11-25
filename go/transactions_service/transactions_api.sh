#!/bin/bash

BASE_URL="http://localhost:8080/transactionservice"

# 1. Create or Update a Transaction
create_or_update_transaction() {
  curl -X PUT "$BASE_URL/transaction/$1" \
    -H "Content-Type: application/json" \
    -d '{
      "amount": '$2',
      "type": "'$3'",
      "parent_id": '$4'
    }'
}

# 2. Get a Transaction by ID
get_transaction() {
  curl -X GET "$BASE_URL/transaction/$1"
}

# 3. Get Transactions by Type
get_transactions_by_type() {
  curl -X GET "$BASE_URL/types/$1"
}

# 4. Get Transaction Sum by ID
get_transaction_sum() {
  curl -X GET "$BASE_URL/sum/$1"
}

# Usage examples:

echo "1. Creating a transaction..."
create_or_update_transaction 12 100.5 "type1" 10

echo -e "\n\n2. Fetching transaction with"
get_transaction 10

echo -e "\n\n3. Fetching transactions of type "
get_transactions_by_type "type1"

echo -e "\n\n4. Calculating sum of transaction tree for ID "
get_transaction_sum 10

