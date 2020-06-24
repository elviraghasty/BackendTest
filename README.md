TODO List API

PREREQUISITE:
Please install express, mongoDB, mocha and chai before run this program

The API(s) that available in this application are :
1. List ToDo ([GET] /api/todos)
2. Detail ToDo ([GET] /api/todos/{id})
3. Create ToDo ([POST] /api/todos)
4. Update ToDo ([PUT] /api/todos/{id})
5. Delete Todo ([DELETE] /api/todos/{id})
6. Delete all Todo ([GET] /api/todos)

There is a Unit tests for those API methods too under app/tests/ folder.

What is not DONE in this submission :
- Add Swagger documentation
- Deploy it to Heroku

Therefore, there is TodoListApp.postman_collection.json under Example folder, so that user can check the result via Postman.

Here are also the example request and response for every API:
1. List ToDo ([GET] /api/todos)
RESPONSE:
[
    {
        "title": "Task1",
        "description": "new task",
        "deadline": "2020-06-25T12:00:00.000Z",
        "isDone": false,
        "createdAt": "2020-06-24T08:38:54.217Z",
        "updatedAt": "2020-06-24T08:38:54.217Z",
        "id": "5ef3111e2307ff3a34d996e3"
    }
]

2. Detail ToDo ([GET] /api/todos/5ef3111e2307ff3a34d996e3)
RESPONSE:
{
    "title": "Task1 Update",
    "description": "new task",
    "deadline": "2020-06-25T12:00:00.000Z",
    "isDone": true,
    "createdAt": "2020-06-24T08:38:54.217Z",
    "updatedAt": "2020-06-24T08:40:12.280Z",
    "id": "5ef3111e2307ff3a34d996e3"
}

3. Create ToDo ([POST] /api/todos)
REQUEST:
{
    "title":"Task1",
    "description":"new task",
    "deadline":"2020-06-25T19:00:00",
    "isDone":false
}

RESPONSE:
{
    "title": "Task1",
    "description": "new task",
    "deadline": "2020-06-25T12:00:00.000Z",
    "isDone": false,
    "createdAt": "2020-06-24T08:05:25.663Z",
    "updatedAt": "2020-06-24T08:05:25.663Z",
    "id": "5ef309450fc3020244fea1a8"
}

4. Update ToDo ([PUT] /api/todos/5ef3111e2307ff3a34d996e3)
REQUEST:
{
    "title":"Task1 Update",
    "description":"new task",
    "deadline":"2020-06-25T19:00:00",
    "isDone":true
}
RESPONSE:
{
    "data": {
        "title": "Task1",
        "description": "new task",
        "deadline": "2020-06-25T12:00:00.000Z",
        "isDone": false,
        "createdAt": "2020-06-24T08:38:54.217Z",
        "updatedAt": "2020-06-24T08:38:54.217Z",
        "id": "5ef3111e2307ff3a34d996e3"
    },
    "message": "Todo is updated successfully."
}

5. Delete Todo ([DELETE] /api/todos/5ef3111e2307ff3a34d996e3)
RESPONSE:
{
    "message": "Todo is deleted successfully!"
}

6. Delete all Todo ([GET] /api/todos)
RESPONSE:
{
    "message": "2 Todo(s) are deleted successfully!"
}
