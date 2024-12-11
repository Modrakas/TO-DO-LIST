// taskEditor.js

function enableTaskEditing() {
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

function updateTask(index, newText) {
  if (newText.trim()) {
    todoList[index].text = newText.trim();
    localStorage.setItem('todoList', JSON.stringify(todoList));
    createTodoList();
  }
}
