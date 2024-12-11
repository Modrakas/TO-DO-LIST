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

//get tasks from local storage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

//call function to create HTML code for each task
createTodoList()

//function that loops through the array & create HTML code for each task
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
    <div class="${task.completed ? 'completed-task' : 'task'}">${task.text}</div>
    <button class="js__delete__todo-btn delete__todo-btn" style="display: ${deleteButtonDisplay};">
      <i class="ri-close-line"></i>
    </button>
  </div>
  `;
    todoListHTML += html;

  });

  //put the HTML on the web page
  const todoListContainer = document.querySelector('.js__todo-list');
  todoListContainer.innerHTML = todoListHTML;

  // Add drag-and-drop event listeners
  addDragAndDropEvents(todoListContainer);


  // Handle check-off button click
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
        // Move not completed tasks back to the top
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

      //call function to createnew to do list
      createTodoList()
    });
  });
      
  //delete task when delete button is clciked
  document.querySelectorAll('.js__delete__todo-btn')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        //save new todoLits to local storage when task is deleted
        localStorage.setItem('todoList', JSON.stringify(todoList));
        
        createTodoList();
      });
    });

    // Make tasks editable when clicked
  document.querySelectorAll('.task').forEach((taskElement) => {
    taskElement.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      const task = todoList[index];
      const taskTextElement = event.target;

      // Hide task text and show input field
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = task.text;
      inputField.classList.add('edit-task-input');
      taskTextElement.innerHTML = '';
      taskTextElement.appendChild(inputField);
      inputField.focus();

      // Update task on input blur (when user clicks outside) or pressing Enter
      inputField.addEventListener('blur', () => {
        updateTask(index, inputField.value);
      });

      inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          updateTask(index, inputField.value);
        }
      });
    });
  });
}

// Function to update the task
function updateTask(index, newText) {
  if (newText.trim()) {
    todoList[index].text = newText.trim();
    localStorage.setItem('todoList', JSON.stringify(todoList));
    createTodoList();
  }
}

// Show input field when add button is clicked
document.querySelector('.js__add-btn')
  .addEventListener('click', () => {
    document.querySelector('.js__add-btn')
  .addEventListener('click', () => {
    document.querySelector('.task-input-container').style.display = 'block';
    //so user does not have to click input field before typing
    document.querySelector('.js__task-input').focus();
    //hide the add-btn when task-input-container appears
    document.querySelector('.js__add-btn').style.display = 'none';
  });
  });

// Spacebar activation for the task input


// Get task from textbox when add task button is clicked
document.querySelector('.js__add-task-btn').addEventListener('click', () => {
  taskInput();
});

//get task from textbox when enter key is pressed
function addTaskKeydown(event) {
  if(event.key === "Enter")
    taskInput();
}

//add task to array
function taskInput () {
  const inputElement = document.querySelector('.js__task-input');
  let taskText = inputElement.value.trim();

  if (taskText){
    todoList.push({text: taskText, completed: false});

    inputElement.value = '';

    // create HTML code for each task
    createTodoList();

    //save new todoList to local storage when new task is added
    localStorage.setItem('todoList', JSON.stringify(todoList));

    //hide the input field container
    document.querySelector('.task-input-container').style.display = 'none';
    document.querySelector('.js__add-btn').style.display = 'block';
  }
}

// Add drag and drop functionality
function addDragAndDropEvents(container) {
  const taskContainers = container.querySelectorAll('.task-container');

  taskContainers.forEach(task => {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragover', handleDragOver);
    task.addEventListener('drop', handleDrop);
  });
}

let draggedTaskIndex;

// Handle drag start event
function handleDragStart(event) {
  draggedTaskIndex = event.target.getAttribute('data-index');
  event.dataTransfer.effectAllowed = 'move';
}

// Handle drag over event
function handleDragOver(event) {
  event.preventDefault(); // Allow drop
  event.dataTransfer.dropEffect = 'move';
}

// Handle drop event
function handleDrop(event) {
  event.preventDefault();
  const targetTaskIndex = event.target.closest('.task-container').getAttribute('data-index');

  if (draggedTaskIndex !== targetTaskIndex) {
    // Move task in the todoList array
    const [movedTask] = todoList.splice(draggedTaskIndex, 1);
    todoList.splice(targetTaskIndex, 0, movedTask);

    // Update local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // Recreate the task list
    createTodoList();
  }
}

// Initialize
createTodoList();


//js date generator
const n = new Date();
document.getElementById("dateNumber").innerHTML = n.getDate();

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const m = new Date();
let month = months[m.getMonth()];
document.getElementById("dateMonth").innerHTML = month;

const year = new Date();
document.getElementById("fullYear").innerHTML = year.getFullYear();

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = days[d.getDay()];
document.getElementById("dayLong").innerHTML = day;


