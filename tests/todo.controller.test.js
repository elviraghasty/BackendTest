//process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Todo = require("../app/models");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Todos', () => {
  beforeEach((done) => { //Before each test we empty the database
      Todo.todos.deleteMany({}, (err) => { 
         done();           
      });        
  });

  //Test the /POST route
 describe('/POST Todo', () => {
  it('it should Post a Todo', (done) => {
      let book = {
          title: "Task TODO 1",
          description: "Test task todo 1",
          deadline: Date.now(),
          isDone:false
      }
    chai.request(server)
        .post('/api/todos')
        .send(book)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('title');
              res.body.should.have.property('description');
              res.body.should.have.property('deadline');
              res.body.should.have.property('isDone');
          done();
        });
  });

  it('it should NOT Post a Todo without title', (done) => {
      let todo = {
          description: "Test task todo 1",
          deadline: Date.now()
      }
    chai.request(server)
        .post('/api/todos')
        .send(todo)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('message').eql("Title cannot be empty!");
          done();
        });
  });
 });

 
  // Get TODO List  
  describe('/GET List Todo', () => {
    it('it should GET all the todo list', (done) => {
      chai.request(server)
          .get('/api/todos')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });
});


  //Test the get Todo by Id
 describe('/GET/:id Todo', () => {
  it('it should GET a Todo by the given id', (done) => {
      let todo = new Todo.todos({ title: "Task Todo 2", description: "new task todo", deadline:Date.now(),isDone:false });
      todo.save((err, book) => {
          chai.request(server)
        .get('/api/todos/' + todo.id)
        .send(todo)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('description');
              res.body.should.have.property('deadline');
              res.body.should.have.property('id').eql(todo.id);
          done();
        });
      });

  });
});

// Test the Update Todo
describe('/PUT/:id Todo', () => {
  it('it should UPDATE a Todo given the id', (done) => {
      let todo = new Todo.todos({title: "Task Todo 2", description: "new task todo", deadline:Date.now(),isDone:false})
      todo.save((err, todo) => {
            chai.request(server)
            .put('/api/todos/' + todo.id)
            .send({title: "Task Update Todo 2", description: "updated task todo", deadline:Date.now(),isDone:true})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("Todo is updated successfully.");
                  res.body.should.have.property('data');
              done();
            });
      });
  });

  it('it should NOT UPDATE a Todo given not exist Id', (done) => {
          chai.request(server)
          .put('/api/todos/5ef3010bec792e0954dbb673')
          .send({title: "Task Update Todo 2", description: "updated task todo", deadline:Date.now(),isDone:true})
          .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Failed to update. There is no Todo data.");
            done();
          });
});
});

// Test delete All Todo
describe('/DELETE/ Todo', () => {
  it('it should DELETE ALL Todo data', (done) => {
    let todo = new Todo.todos(
      {title: "Task Todo 1", description: "new task todo", deadline:Date.now(), isDone:false})
    todo.save();
    todo = new Todo.todos(
      {title: "Task Todo 2", description: "new task todo", deadline:Date.now(), isDone:false})
    todo.save((err, todo) => {
            chai.request(server)
            .delete('/api/todos/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('2 Todo(s) are deleted successfully!');
              done();
            });
      });
  });
});

// Test delete by ID
describe('/DELETE/:id Todo', () => {
  it('it should DELETE a Todo given the id', (done) => {
    let todo = new Todo.todos({title: "Task Todo 2", description: "new task todo", deadline:Date.now(),isDone:false})
    todo.save((err, todo) => {
            chai.request(server)
            .delete('/api/todos/' + todo.id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Todo is deleted successfully!');
              done();
            });
      });
  });

  it('it should NOT DELETE a Todo given not exist id', (done) => {
    let todo = new Todo.todos({title: "Task Todo 2", description: "new task todo", deadline:Date.now(),isDone:false})
    todo.save((err, todo) => {
            chai.request(server)
            .delete('/api/todos/5ef3010bec792e0954dbb673')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Todo is deleted successfully!');
              done();
            });
      });
  });
});

});
