Build and run docker:

docker-compose up -d --build

Apollo server will run at:

http://localhost:4000/

# Task API with Typegraphql, Mongo and Docker

## 💻 Requirements

Check if you have all requirements to install this project:

- Docker

## 🚀 Install

To install the <Task API Typegraphql project>, follow these steps:

Build and run docker:

```
docker-compose up -d --build
```

After build, the Apollo server will run at:

```
http://localhost:4000/
```

## ☕ Usage

In order to use <Task API Typegraphql project>, follow these steps:

Register a new user

```
Mutation > Register new user > Get the JWT token
```

Request example:

```
{
  "registerUser": {
    "email": "tom",
    "password": "tom"
  }
}
```

---

Create a new task

```
Mutation > Add Task > Insert the Authorization header as: "Bearer eyxxxxxxxx"
```

Request example:

```
{
  "addTask": {
    "title": "My Task Title",
    "description": "This is a task description",
    "status": "ARCHIVED"
  }
}
```

HINT: You can cycle through different types of status by pressing "CTRL + SPACE" inside Apollo Server sandbox

---

Update existing task status

```
Mutation > Update Task > Insert the Authorization header as: "Bearer eyxxxxxxxx"
```

Request example:

```
{
  "updateTask": {
    "id": "63449046134af47760f07976",
    "status": "DONE"
  }
}
```

HINT: You can cycle through different types of status by pressing "CTRL + SPACE" inside Apollo Server sandbox

---

Get all Tasks from logged user

```
Query > Tasks > Insert the Authorization header as: "Bearer eyxxxxxxxx"
```

---

## Considerations

Authorization middleware logic rests inside auth.ts

Seeding and drop database logic was commented for convenience
