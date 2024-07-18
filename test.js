document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.description}</span>
                ${task.dueDate ? `<span class="due-date">Due Date: ${task.dueDate}</span>` : ''}
                <button class="complete-btn" data-index="${index}">Complete</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }

    function addTask(description, dueDate) {
        const newTask = {
            description: description,
            dueDate: dueDate,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const description = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        if (description !== '') {
            addTask(description, dueDate);
            taskInput.value = '';
            dueDateInput.value = '';
        }
    });

    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('complete-btn')) {
            const index = parseInt(target.getAttribute('data-index'));
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        } else if (target.classList.contains('delete-btn')) {
            const index = parseInt(target.getAttribute('data-index'));
            tasks.splice(index, 1);
            renderTasks();
        }
    });
});