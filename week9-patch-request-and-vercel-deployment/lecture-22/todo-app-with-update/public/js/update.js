const updateForm = document.getElementById('update-form');
const contentInput = document.getElementById('todo-content');
const doneInput = document.getElementById('todo-done');
const messageElement = document.getElementById('update-message');

// Get todo id from URL query string
const params = new URLSearchParams(window.location.search);
const todoId = params.get('id');

// Prefill the form with the current values of the todo
const fetchTodo = async () => {
  try {
    const response = await fetch(`${API_URL}/todos/${todoId}`)
    if (!response.ok) {
      throw new Error('Todo not found')
    }
    const todo = await response.json()

    contentInput.value = todo.content
    doneInput.checked = todo.done
  } catch (error) {
    messageElement.textContent = 'Something went wrong'
    console.log(error)
  }
}
fetchTodo()

updateForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const content = contentInput.value.trim()
  if (!content) return

  try {
    await fetch(`${API_URL}/todos/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, done: doneInput.checked })
    })
    window.location.href = 'index.html'
  } catch (error) {
    console.log(error)
  }
})
