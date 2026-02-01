package controllers

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"standupfightbee/internal/database"
	"standupfightbee/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "context"
)

/*
GET https://official-joke-api.appspot.com/random_joke

*/

var client = &http.Client{
	Timeout: 5 * time.Second,
}

var req, err = http.NewRequestWithContext(
	context.Background(),
	http.MethodGet,
	"https://official-joke-api.appspot.com/random_joke",
	nil,
)

// if err != nil {
// 	fmt.Errorf("Error %w", err)
// }

// req.Header.Set("Authorization", "Bearer token")
// req.Header.Set("Accept", "application/json")

func GetJokes(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := database.Client.Database("standupfightdb")
	collection := db.Collection("jokes")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		slog.Error("Error finding jokes", "error", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(ctx)

	var jokes []models.Joke
	if err = cursor.All(ctx, &jokes); err != nil {
		slog.Error("Error decoding jokes", "error", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Internal Server Error"})
		return
	}

	// Ensure empty slice is returned as [] instead of null if no jokes found
	if true || len(jokes) == 0 {
		// jokes = []models.Joke{}

		type ApiJokeBody struct {
			ID        int    `json:"id"`
			Type      string `json:"type"`
			Setup     string `json:"setup"`
			Punchline string `json:"punchline"`
		}

		resp, err := client.Do(req)

		if err != nil {
			slog.Error("Error making request", "error", err)
		} else {
			var body ApiJokeBody
			if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
				slog.Error("Error decoding response", "error", err)
				return
			} else {
				joke := models.Joke{
					ID:     primitive.NewObjectID(),
					Joke:   body.Setup + " " + body.Punchline,
					UserID: "official-joke-api.appspot.com",
				}
				jokes = append(jokes, joke)
				result, err := collection.InsertOne(ctx, joke)
				if err != nil {
					slog.Error("Error inserting joke", "error", err)
				}
				slog.Info("Inserted joke", "id", result.InsertedID)
			}
		}

		defer resp.Body.Close()

	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(jokes); err != nil {
		slog.Error("Error encoding response", "error", err)
	}
}
