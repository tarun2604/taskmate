document.addEventListener('DOMContentLoaded', function () {
    const inputbox = document.getElementById('inputbox');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    loadTasksFromLocalStorage();
    addTaskButton.addEventListener('click', handleAddTask);

    function handleAddTask() {
        const taskText = inputbox.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTaskToList(taskText);
        inputbox.value = '';
    }

    function addTaskToList(taskText) {

        const li = createTaskElement(taskText);
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasksToLocalStorage(); 
        });
        taskList.appendChild(li);

        saveTasksToLocalStorage();
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button"><span class="material-symbols-outlined">delete</span></button>
        `;
        return li;
    }
    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.querySelectorAll('li span')).map(task => task.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => {

            addTaskToList(taskText);
        });
    }
});
