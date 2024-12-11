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
let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

//create HTML code for each task
createTaskList()

//loop through the array
//create HTML code for each task
function createTaskList() {
  let taskListHTML = '';

  taskList.forEach((task, index) => {
    const taskText = task.text || '';
    const checkedClass = task.completed ? 'ri-check-double-line' : 'ri-checkbox-blank-circle-line';
    const deleteButtonDisplay = task.completed ? 'ri-close-line' : 'none';

    const html = `
 <div class="task-container" draggable="true" data-index="${index}">
 <button class="js-checkOff-task-btn check-task-btn">
     <i class="${checkedClass} task-circle"></i>
   </button>
   <div class="${task.completed ? 'completed-task' : 'task'}">${task.text}</div>
   <button class="js-delete-task-btn delete-task-btn" style="display: ${deleteButtonDisplay};">
     <i class="ri-close-line"></i>
   </button>
 </div>
 `;
    taskListHTML += html;

  });

  //put the HTML on the web page
  const taskListContainer = document.querySelector('.js-task-list');
  taskListContainer.innerHTML = taskListHTML;

  dragDrop(taskListContainer);

  function dragDrop(container) {
    const taskContainers = container.querySelectorAll('.task-container');

    taskContainers.forEach(task => {
      task.addEventListener('dragstart', dragStart);
      task.addEventListener('dragover', dragOver);
      task.addEventListener('drop', drop);
    });
  }

  let draggedTaskIndex;

  //Start drag function
  function dragStart(event) {
    draggedTaskIndex = event.target.getAttribute('data-index');
    event.dataTransfer.effectAllowed = 'move';
  }

  //Drag over function
  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  //Drop function
  function drop(event) {
    event.preventDefault();
    const targetTaskIndex = event.target.closest('.task-container').getAttribute('data-index');

    if (draggedTaskIndex !== targetTaskIndex) {
      //Move task in the taskList array
      const [movedTask] = taskList.splice(draggedTaskIndex, 1);
      taskList.splice(targetTaskIndex, 0, movedTask);

      // Update local storage
      localStorage.setItem('taskList', JSON.stringify(taskList));
      // Recreate the task list
      createTaskList();
    }
  }

  // Handle check-off button click
  document.querySelectorAll('.js-checkOff-task-btn').forEach((checkButton, index) => {
    checkButton.addEventListener('click', () => {
      const icon = checkButton.querySelector('i');
      const task = taskList[index];

      // Toggle task completion status
      task.completed = !task.completed;

      // Update icon class
      icon.classList.toggle('ri-checkbox-blank-circle-line');
      icon.classList.toggle('ri-check-double-line');

      // Update delete button visibility
      const deleteButton = document.querySelectorAll('.js-delete-task-btn')[index];
      deleteButton.style.display = task.completed ? 'inline-block' : 'none';

      // Save updated taskList to local storage
      localStorage.setItem('taskList', JSON.stringify(taskList));

      //needed to store new to do list
      createTaskList()
    });
  });


  //delete task when delete button is clciked
  document.querySelectorAll('.js-delete-task-btn')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        taskList.splice(index, 1);
        //save new taskLits to local storage when task is deleted
        localStorage.setItem('taskList', JSON.stringify(taskList));

        createTaskList();
      });
    });
}

// Show input field when add button is clicked
document.querySelector('.js-add-btn')
  .addEventListener('click', () => {
    document.querySelector('.js-add-btn')
      .addEventListener('click', () => {
        document.querySelector('.task-input-container').style.display = 'block';
        //so user does not have to click input field before typing
        document.querySelector('.js-task-input').focus();
        //hide the add-btn when task-input-container appears
        document.querySelector('.js-add-btn').style.display = 'none';
      });
  });

// Get task from textbox when add task button is clicked
document.querySelector('.js-add-task-btn').addEventListener('click', () => {
  taskInput();
});

//get task from textbox when enter key is pressed
function addTaskKeydown(event) {
  if (event.key === "Enter")
    taskInput();
}

//add task to array
function taskInput() {
  const inputElement = document.querySelector('.js-task-input');
  let taskText = inputElement.value.trim();

  if (taskText) {
    taskList.push({ text: taskText, completed: false });

    inputElement.value = '';

    // create HTML code for each task
    createTaskList();

    //save new taskList to local storage when new task is added
    localStorage.setItem('taskList', JSON.stringify(taskList));

    //hide the input field container
    document.querySelector('.task-input-container').style.display = 'none';
    document.querySelector('.js-add-btn').style.display = 'block';
  }
}
