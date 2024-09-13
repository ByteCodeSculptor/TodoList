document.getElementById('addTaskBtn').addEventListener('click', addTask); // add task button

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskDate = new Date().toLocaleString();
    const todoList = document.getElementById('todoList');

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = taskText;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.innerText = `Added on: ${taskDate}`;

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.innerText = 'Update';
    updateBtn.addEventListener('click', () => updateTask(span, li.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li.id));

    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);

    // Send the new task to the server with POST method to port 3000.
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText, date: taskDate }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        li.id = data.id; // server returns the ID of the new task todolist(id).
        todoList.appendChild(li);
    } catch (error) {
        console.error('Error:', error);
    }

    taskInput.value = ''; //clears the task area after appending the todo.
}
//file system ..

async function updateTask(taskSpan, taskId) {
    const newTask = prompt('Update task:', taskSpan.innerText);

    if (newTask !== null && newTask.trim() !== '') {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newTask.trim() }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            taskSpan.innerText = newTask.trim();
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/todos/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Remove the task from the UI
        document.getElementById(taskId).remove();
    } catch (error) {
        console.error('Error:', error);
    }
}
