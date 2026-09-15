const todoTitleElement = document.getElementById('todo-title');
const todoDateElement = document.getElementById('todo-date');
const subtasksElement = document.getElementById('subtasks');
const subtaskForm = document.getElementById('subtask-form');
// Get todo id from URL query string
const params = new URLSearchParams(window.location.search);
const todoId = params.get('id');

const fetchTodo = async () => {
  try {
    const response = await fetch(`${API_URL}/todos/${todoId}`)
    const todo = await response.json()

    todoTitleElement.textContent = todo.content
    todoDateElement.textContent = todo.created_at

    renderSubtasks(todo.subtasks)
  } catch (error) {
    todoTitleElement.textContent = 'Something went wrong'
    console.log(error)
  }
}

const renderSubtasks = (subtasks) => {
  if (!subtasks || subtasks.length === 0) {
    subtasksElement.innerHTML = '<p>No subtasks yet.</p>'
    return
  }

  subtasksElement.innerHTML = subtasks.map((subtask) => `
    <div class="${subtask.done ? 'done' : ''}">
      <p>
        <span class="date"><i>${subtask.created_at}</i></span>
        <span>${subtask.content}</span>
        <!--<button class="btn btn-sm btn-outline-success ms-2" onclick="toggleSubtask('${subtask._id}', ${!subtask.done})">
          ${subtask.done ? 'Undo' : 'Done'}
        </button>-->
        <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteSubtask('${subtask._id}')">
          Delete
        </button>
      </p>
    </div>`
  ).join('')
}
fetchTodo()

subtaskForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const contentInput = document.getElementById('subtask-content')
  const content = contentInput.value.trim()
  if (!content) return

  try {
    await fetch(`${API_URL}/subtasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, todo_id: todoId })
    })
    contentInput.value = ''
    fetchTodo()
  } catch (error) {
    console.log(error)
  }
})

const toggleSubtask = async (subtaskId, done) => {
  try {
    await fetch(`${API_URL}/subtasks/${subtaskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done })
    })
    fetchTodo()
  } catch (error) {
    console.log(error)
  }
}

const deleteSubtask = async (subtaskId) => {
  try {
    await fetch(`${API_URL}/subtasks/${subtaskId}`, {
      method: 'DELETE'
    })
    fetchTodo()
  } catch (error) {
    console.log(error)
  }
}


