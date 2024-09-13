const express = require('express');
const path = require('path');
const cors = require('cors');//required library functions.

const app = express();//app is an instance in express framework that must be used to define something.
const port = 3000;

app.use(express.static(path.join(__dirname, 'project')));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to enable CORS

let todos = []; // In-memory store for todos
let nextId = 1; // ID counter for new todos

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project', 'index.html'));
});

// Create a new to-do
app.post('/api/todos', (req, res) => {
    const { text, date } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Task text is required' });//if there is no task added
    }

    const newTodo = { id: nextId++, text, date };
    todos.push(newTodo);//adding todo to array.
    res.status(201).json(newTodo);//respond with new todo
});

// Update an existing to-do
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);//converting the id into decimal.
    const { text } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    if (text) {
        todo.text = text; //updated taskis added to array
    }

    

    res.json(todo);//respond with new todo
});

// Delete a to-do
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(t => t.id !== id);

    res.status(204).end(); // No content to return after deletion
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
