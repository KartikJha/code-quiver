package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func ConnectDB() (*mongo.Database, error) {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		uri = "mongodb://standupfight:strongpassword@localhost:27017/standupfightdb?authSource=standupfightdb"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}

	log.Println("✅ MongoDB connected")
	Client = client
	return client.Database("standupfightdb"), nil
}
