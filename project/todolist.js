document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim(); //trim() : removes the white spaces front nd back of text.

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskDate = new Date().toLocaleString();
    const todoList = document.getElementById('todoList');

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = taskText; //innerHTML give tags also ex: <p> hello <p>
                            //innerTEXT gives only "hello"

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date'; //task-date class is created in inspect HTML code
    dateSpan.innerText = `Added on: ${taskDate}`;

    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.innerText = 'Update';
    updateBtn.addEventListener('click', () => updateTask(span)); //span help in understanding the DOM which task to update.

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li));//li help in understanding the DOM which task to delete.

    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);    //to add all above lists to <ul>.

    taskInput.value = '';   //after adding the text this help in clearing the textInput area for new text.
}

function updateTask(taskSpan) {
    const newTask = prompt('Update task:', taskSpan.innerText);// this shows the dilog box saying "update task:" with previos text data inside.
    if (newTask !== null && newTask.trim() !== '') {
        taskSpan.innerText = newTask.trim();
    }
}

function deleteTask(taskLi) {
    taskLi.remove();
}


