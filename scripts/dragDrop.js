// dragDrop.js

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
