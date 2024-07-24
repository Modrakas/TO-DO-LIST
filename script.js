/*
1. create an array to store tasks
2. get task from textbox when add button is clicked
3. add task to array
4. console.log() the array
5. loop through the array
6. create HTML code for each task
7. put the HTML on the web page
*/


//gets data form local storage when page is opened/refreshed


// create an array to store tasks
//get tasks from local storage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

//create HTML code for each task
createTodoList()

//loop through the array
//create HTML code for each task
function createTodoList() {
  let todoListHTML = '';

todoList.forEach((task, index) => {
  const taskText = task.text || '';
  const checkedClass = task.completed ? 'ri-check-double-line' : 'ri-checkbox-blank-circle-line';
  const deleteButtonDisplay = task.completed ? 'inline-blaco' : 'none';

  const html = `
  <div class="task-container">
    <div class="${task.completed ? 'completed-task' : 'task'}">${task.text}</div>
    <button class="js__checkOff__todo-btn check__todo-btn">
      <i class="${checkedClass} task__circle"></i>
    </button>
    <button class="js__delete__todo-btn delete__todo-btn" style="display: ${deleteButtonDisplay};">
      <i class="ri-delete-bin-line"></i>
    </button>
  </div>
  `;
    todoListHTML += html;

  });

    //put the HTML on the web page
  document.querySelector('.js__todo-list')
  .innerHTML = todoListHTML;

  // Handle check-off button click
  document.querySelectorAll('.js__checkOff__todo-btn').forEach((checkButton, index) => {
    checkButton.addEventListener('click', () => {
      const icon = checkButton.querySelector('i');
      const task = todoList[index];

      // Toggle task completion status
      task.completed = !task.completed;

      // Update icon class
      icon.classList.toggle('ri-checkbox-blank-circle-line');
      icon.classList.toggle('ri-check-double-line');

      // Update delete button visibility
      const deleteButton = document.querySelectorAll('.js__delete__todo-btn')[index];
      deleteButton.style.display = !task.completed ? 'inline-block' : 'none';

      // Save updated todoList to local storage
      localStorage.setItem('todoList', JSON.stringify(todoList));
    });
  });
      

  //delete task when delete button is clciked
  document.querySelectorAll('.js__delete__todo-btn')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        console.log('Deleting task at index:', index);
        todoList.splice(index, 1);

        console.log('Updated todoList:', todoList);
        //save new todoLits to local storage when task is deleted
        localStorage.setItem('todoList', JSON.stringify(todoList));
        
        createTodoList();
      });
    });
}

// Show input field when add button is clicked
document.querySelector('.js__add-btn')
  .addEventListener('click', () => {
    document.querySelector('.task-input-container').style.display = 'block';
    //so user does not have to click input field before typing
    document.querySelector('.js__task-input').focus();
    //hide the add-btn when task-input-container appears
    document.querySelector('.js__add-btn').style.display = 'none';
  });

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

// // Create an array to store tasks
// // Get tasks from local storage
// let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
// console.log('Loaded todoList:', todoList);

// // Create HTML code for each task
// createTodoList();

// // Function to create and render the task list
// function createTodoList() {
//   let todoListHTML = '';

//   todoList.forEach((task, index) => {
//     const checkedClass = task.completed ? 'ri-check-double-line' : 'ri-checkbox-blank-circle-line';
//     const deleteButtonDisplay = task.completed ? 'inline-block' : 'none';
//     const taskClass = task.completed ? 'completed-task' : '';

//     const html = `
//       <div class="task-container">
//         <div class="task ${taskClass}">${task.text}</div>
//         <button class="js__checkOff__todo-btn check__todo-btn">
//           <i class="${checkedClass} task__circle"></i>
//         </button>
//         <button class="js__delete__todo-btn delete__todo-btn" style="display: ${deleteButtonDisplay};">
//           <i class="ri-check-double-line task__check"></i>
//         </button>
//       </div>
//     `;
//     todoListHTML += html;
//   });

//   // Put the HTML on the web page
//   document.querySelector('.js__todo-list').innerHTML = todoListHTML;

//   // Toggle check off and delete task when check button is clicked
//   document.querySelectorAll('.js__checkOff__todo-btn').forEach((checkButton, index) => {
//     checkButton.addEventListener('click', () => {
//       const icon = checkButton.querySelector('i');
//       const task = todoList[index];

//       icon.classList.toggle('ri-checkbox-blank-circle-line');
//       icon.classList.toggle('ri-check-double-line');

//       // Update task status
//       task.completed = !task.completed;

//       // Only show delete button when icon class is ri-check-double-line
//       const deleteButton = document.querySelectorAll('.js__delete__todo-btn')[index];
//       deleteButton.style.display = task.completed ? 'inline-block' : 'none';

//       // Save updated todoList to local storage
//       console.log('Saving to localStorage:', JSON.stringify(todoList));
//       localStorage.setItem('todoList', JSON.stringify(todoList));
//     });
//   });

//   // Delete task when delete button is clicked
//   document.querySelectorAll('.js__delete__todo-btn').forEach((deleteButton, index) => {
//     deleteButton.addEventListener('click', () => {
//       // Remove the task from the array
//       todoList.splice(index, 1);
      
//       // Save updated todoList to local storage
//       console.log('Saving to localStorage:', JSON.stringify(todoList));
//       localStorage.setItem('todoList', JSON.stringify(todoList));
      
//       // Recreate the task list
//       createTodoList();
//     });
//   });
// }

// // Show input field when add button is clicked
// document.querySelector('.js__add-btn').addEventListener('click', () => {
//   document.querySelector('.task-input-container').style.display = 'block';
//   document.querySelector('.js__task-input').focus();
//   document.querySelector('.js__add-btn').style.display = 'none';
// });

// // Get task from textbox when add task button is clicked
// document.querySelector('.js__add-task-btn').addEventListener('click', () => {
//   taskInput();
// });

// // Get task from textbox when enter key is pressed
// function addTaskKeydown(event) {
//   if (event.key === "Enter") taskInput();
// }

// // Add task to array
// function taskInput() {
//   const inputElement = document.querySelector('.js__task-input');
//   let taskText = inputElement.value.trim();

//   if (taskText) {
//     todoList.push({ text: taskText, completed: false });
//     inputElement.value = '';

//     createTodoList();

//     // Save new todoList to local storage when new task is added
//     console.log('Saving to localStorage:', JSON.stringify(todoList));
//     localStorage.setItem('todoList', JSON.stringify(todoList));

//     // Hide the input field container
//     document.querySelector('.task-input-container').style.display = 'none';
//     document.querySelector('.js__add-btn').style.display = 'block';
//   }
// }