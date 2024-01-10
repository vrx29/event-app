const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
let todos = [];

// GET endpoint to get all the events
app.get("/events", (req, res) => {
  fs.readFile("data/events.json", (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// POST endpoint to create a new todo item
app.post("/events", (req, res) => {
  fs.readFile("data/registrations.json", (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const registrations = JSON.parse(data);
      console.log(registrations);
      registrations.tasks.push(req.body);
      // fs.writeFile("data.json", JSON.stringify(todo), (error) => {
      //   if (error) {
      //     res.status(500).send(error);
      //   } else {
      //     res.send(todo);
      //   }
      // });
    }
  });
  //   const todo = {
  //     id: todos.length + 1,
  //     title: req.body.title,
  //     completed: req.body.completed || false,
  //   };
  //   todos.push(todo);
  //   res.status(201).json(todo);
});

// PUT endpiont to update an existing todo item with the specified `id`
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

// DELETE endpoint to remove an existing todo item with the specified `id`
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// run the server on port 3000
// for example the app can run locally at this URL: http://localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
