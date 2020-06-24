const db = require("../models");
const Todo = db.todos;

// Create and save a new todo
exports.createTodo = (req,res)=>{
    if(!req.body.title){
        res.status(400).send({message:"Title cannot be empty!"});
        return;
    }

    //Create a todo
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        isDone: req.body.isDone? req.body.isDone : false
    });

    //Save todo in the database
    newTodo
    .save(newTodo)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating new Todo."
        });
    });
};

// Retrieve All Todos form the database.
exports.getAllTodo = (req,res)=>{
    // const title = req.query.title;
    // var condition = title ? {title: { $regex: new RegExp(title), $options: "i" }}:{};

    Todo.find({})
    .then(data=>{
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "some error occured while retrieve data"
        });
    });
};

// Find a single Todo with an Id
exports.getTodoById = (req,res)=>{
    const id = req.params.id;

    Todo.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "There is no Todo with id: " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Todo with id=" + id });
      });
};

// Update a Todo by the id in the request
exports.updateTodo = (req,res)=>{
    if (!req.body) {
        return res.status(400).send({
          message: "Update data cannot be empty!"
        });
      }
    
      const id = req.params.id;
    
      Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: "Failed to update. There is no Todo data."
            });
          } else res.send({ data, message: "Todo is updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Failed to update Todo."
          });
        });
};

// Delete a Todo with the specified id in the request
exports.deleteTodoById = (req,res)=>{
    const id = req.params.id;

    Todo.findOneAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Failed to delete. There is no Todo data."
          });
        } else {
          res.send({
            message: "Todo is deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Failed to update Todo"
        });
      });
};

// Delete all Todos form database
exports.deleteAllTodo = (req,res)=>{
    Todo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todo(s) are deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todos."
      });
    });
};