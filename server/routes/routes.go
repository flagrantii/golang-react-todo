package routes

import (
	"github.com/flagrantii/golang-react-todo/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/api/todo", middleware.GetAllTodos).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/todos", middleware.CreateTodo).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/todos/{id}", middleware.TodoComplete).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/undotodos/{id}", middleware.UndoTodo).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/deletetodos/{id}", middleware.DeleteTodo).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/api/todos/deleteall", middleware.DeleteAlltodo).Methods("DELETE", "OPTIONS")
	return r
}
