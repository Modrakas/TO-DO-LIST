/*
1. create an array to store tasks
2. get task from textbox when add button is clicked
3. add task to array
4. console.log() the array
5. loop through the array
6. create HTML code for each task
7. put the HTML on the web page
*/

/*
1. Add times to tasks
2. be able to click on task and edit task
3. be able to brag tasks and move them up or down in the list
4. drag and drop
*/

// taskManager.js

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function createTodoList() {
  let todoListHTML = '';

  todoList.forEach((task, index) => {
    const taskText = task.text || '';
    const checkedClass = task.completed ? 'ri-check-double-line' : 'ri-checkbox-blank-circle-line';
    const deleteButtonDisplay = task.completed ? 'ri-close-line' : 'none';

    const html = `
    <div class="task-container" draggable="true" data-index="${index}">
      <button class="js__checkOff__todo-btn check__todo-btn">
        <i class="${checkedClass} task__circle"></i>
      </button>
      <div class="${task.completed ? 'completed-task' : 'task'}" data-index="${index}">${task.text}</div>
      <button class="js__delete__todo-btn delete__todo-btn" style="display: ${deleteButtonDisplay};">
        <i class="ri-close-line"></i>
      </button>
    </div>
    `;
    todoListHTML += html;
  });

  // put the HTML on the web page
  const todoListContainer = document.querySelector('.js__todo-list');
  todoListContainer.innerHTML = todoListHTML;

  // Handle check-off button click
  handleCheckOffClick();
  
  // Handle delete button click
  handleDeleteClick();
}

function handleCheckOffClick() {
  document.querySelectorAll('.js__checkOff__todo-btn').forEach((checkButton, index) => {
    checkButton.addEventListener('click', () => {
      const icon = checkButton.querySelector('i');
      const task = todoList[index];

      // Toggle task completion status
      task.completed = !task.completed;

      // Move completed tasks to the bottom
      if (task.completed) {
        todoList.push(todoList.splice(index, 1)[0]); // Move to the end of the array
      } else {
        todoList.unshift(todoList.splice(index, 1)[0]); // Move to the start of the array
      }

      // Update icon class
      icon.classList.toggle('ri-checkbox-blank-circle-line');
      icon.classList.toggle('ri-check-double-line');

      // Update delete button visibility
      const deleteButton = document.querySelectorAll('.js__delete__todo-btn')[index];
      deleteButton.style.display = task.completed ? 'inline-block' : 'none';

      // Save updated todoList to local storage
      localStorage.setItem('todoList', JSON.stringify(todoList));

      createTodoList();
    });
  });
}

function handleDeleteClick() {
  document.querySelectorAll('.js__delete__todo-btn')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        // Save new todoList to local storage when task is deleted
        localStorage.setItem('todoList', JSON.stringify(todoList));

        createTodoList();
      });
    });
}

function taskInput() {
  const inputElement = document.querySelector('.js__task-input');
  let taskText = inputElement.value.trim();

  if (taskText) {
    todoList.push({ text: taskText, completed: false });
    inputElement.value = '';

    // Create HTML code for each task
    createTodoList();

    // Save new todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // Hide the input field container
    document.querySelector('.task-input-container').style.display = 'none';
    document.querySelector('.js__add-btn').style.display = 'block';
  }
}

document.querySelector('.js__add-task-btn').addEventListener('click', () => {
  taskInput();
});
