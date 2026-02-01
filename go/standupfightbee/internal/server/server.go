package server

import (
	"log"
	"net/http"

	"standupfightbee/internal/database"
	"standupfightbee/internal/sse"
)

func Start(port string) error {
	// Initialize SSE Broker
	broker := sse.NewBroker()

	// Start Database Listener in background
	// Note: ideally we handle graceful shutdown for this
	go database.StartJokeListener(database.Client.Database("standupfightdb"), broker)

	mux := RegisterRoutes(broker)
	server := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	log.Printf("🚀 Native Go API running on http://localhost:%s", port)
	return server.ListenAndServe()
}
