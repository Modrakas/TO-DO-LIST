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
    const html = `
      <div class="task">${task}</div>
      <button class="js__delete__todo-btn delete__todo-btn">x</button>
    `;
    todoListHTML += html;

  });

    //put the HTML on the web page
  document.querySelector('.js__todo-list')
  .innerHTML = todoListHTML;

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
}

//get task from textbox when add button is clicked
document.querySelector('.js__add-btn')
  .addEventListener('click', () => {
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
  let task = inputElement.value.trim();

  if (task){
    todoList.push(task);

    inputElement.value = '';

    // create HTML code for each task
    createTodoList();

    //save new todoList to local storage when new task is added
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
}

