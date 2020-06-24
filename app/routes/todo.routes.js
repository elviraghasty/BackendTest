module.exports = app =>{
    const todos = require("../controllers/todo.controller.js");

    var router = require("express").Router();

    // Create a new Todo
    router.post("/", todos.createTodo);

    // Retrieve All Todos
    router.get("/",todos.getAllTodo);

    // Retrieve a single Todo with id
    router.get("/:id", todos.getTodoById);

    // Update a Todo with id
    router.put("/:id", todos.updateTodo);

    // Delete a Todo with id
    router.delete("/:id", todos.deleteTodoById);

    // Delete All Todos
    router.delete("/", todos.deleteAllTodo);

    app.use('/api/todos', router);
};