package sse

import (
	"fmt"
	"log/slog"
	"net/http"
	"sync"
)

// Broker manages the SSE client connections.
type Broker struct {
	// Mutex to protect the clients map
	mu sync.Mutex
	// Map of active clients. The key is the channel used to send data to the client.
	// The value is just a boolean (set implementation).
	clients map[chan []byte]bool
	// Channel to broadcast messages to all clients
	BroadcastChan chan []byte
}

// NewBroker creates a new Broker instance.
func NewBroker() *Broker {
	return &Broker{
		clients:       make(map[chan []byte]bool),
		BroadcastChan: make(chan []byte),
	}
}

// ServeHTTP handles the SSE connection.
func (b *Broker) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Mandatory headers for SSE
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Create a channel for this client
	clientChan := make(chan []byte, 10) // Buffered channel to prevent blocking

	// Register the client
	b.mu.Lock()
	b.clients[clientChan] = true
	b.mu.Unlock()

	slog.Info("New SSE client connected", "remote_addr", r.RemoteAddr)

	// Ensure we remove the client when they disconnect
	defer func() {
		b.mu.Lock()
		delete(b.clients, clientChan)
		close(clientChan)
		b.mu.Unlock()
		slog.Info("SSE client disconnected", "remote_addr", r.RemoteAddr)
	}()

	// Flush the headers to establish the connection immediately
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}
	flusher.Flush()

	// Listen for messages or context cancellation
	for {
		select {
		case msg, open := <-clientChan:
			if !open {
				return
			}
			// SSE format: "data: <payload>\n\n"
			fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
		case <-r.Context().Done():
			return
		}
	}
}

// Broadcast sends a message to all connected clients.
func (b *Broker) Broadcast(msg []byte) {
	b.mu.Lock()
	defer b.mu.Unlock()

	for clientChan := range b.clients {
		select {
		case clientChan <- msg:
		default:
			// If client channel is full, we might skip or drop to avoid blocking everyone
			// For now, we just skip this client for this message
			slog.Warn("Skipping blocked SSE client")
		}
	}
}
