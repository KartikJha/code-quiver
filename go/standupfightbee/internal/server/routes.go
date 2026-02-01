package server

import (
	"net/http"

	"standupfightbee/internal/controllers"
	"standupfightbee/internal/sse"
)

func RegisterRoutes(broker *sse.Broker) *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/jokes", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			controllers.GetJokes(w, r)
			return
		}
		http.NotFound(w, r)
	})

	// SSE Endpoint
	mux.Handle("/events", broker)

	return mux
}
