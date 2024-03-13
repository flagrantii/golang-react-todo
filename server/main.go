package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/flagrantii/golang-react-todo/routes"
)

func main() {
	r := routes.Router()
	fmt.Println("Starting server on the port 4000...")

	log.Fatal(http.ListenAndServe(":4000", r))
}
