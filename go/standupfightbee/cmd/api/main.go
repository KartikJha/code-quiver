package main

import (
	"log"
	"os"

	"standupfightbee/internal/database"
	"standupfightbee/internal/server"
)

func main() {
	// 1. Initialize DB
	_, err := database.ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// 2. Start Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "7000"
	}

	if err := server.Start(port); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
