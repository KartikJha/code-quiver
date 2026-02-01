package database

import (
	"context"
	"encoding/json"
	"log/slog"

	"standupfightbee/internal/sse"

	"go.mongodb.org/mongo-driver/mongo"
)

// StartJokeListener watches the jokes collection and broadcasts changes via the SSE broker.
func StartJokeListener(db *mongo.Database, broker *sse.Broker) {
	collection := db.Collection("jokes")

	// Verify we are in a replica set (Change Streams require it) usually.
	// For local dev with standalone, this might fail unless it's a single-node replset.
	// We'll proceed assuming the environment is set up for it, or it will error log.

	stream, err := collection.Watch(context.Background(), mongo.Pipeline{})
	if err != nil {
		slog.Error("Failed to start MongoDB change stream", "error", err)
		// If it fails (e.g. not a replica set), just return. The app still works without realtime.
		return
	}

	defer stream.Close(context.Background())

	slog.Info("Listening for joke changes immediately...")

	for stream.Next(context.Background()) {
		var changeEvent struct {
			FullDocument  map[string]interface{} `bson:"fullDocument"`
			OperationType string                 `bson:"operationType"`
		}

		if err := stream.Decode(&changeEvent); err != nil {
			slog.Error("Error decoding change event", "error", err)
			continue
		}

		// We only care about inserts for now (new jokes)
		if changeEvent.OperationType == "insert" {
			// Convert the document to JSON
			jsonBytes, err := json.Marshal(changeEvent.FullDocument)
			if err != nil {
				slog.Error("Error marshaling joke to JSON", "error", err)
				continue
			}

			// Broadcast to all SSE clients
			slog.Info("Broadcasting new joke to clients")
			broker.Broadcast(jsonBytes)
		}
	}

	if err := stream.Err(); err != nil {
		slog.Error("Change stream error", "error", err)
	}
}
