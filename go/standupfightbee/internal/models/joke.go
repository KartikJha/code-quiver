package models

import (
	"math/big"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Joke struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    string             `bson:"userId" json:"userId"`
	Joke      string             `bson:"joke" json:"joke"`
	BattleID  string             `bson:"battleId" json:"battleId"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt" json:"updatedAt"`
	Score     big.Int            `bson:"score" json:"score"`
}
