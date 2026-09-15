const createForm = document.getElementById('create-form');

createForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const contentInput = document.getElementById('todo-content')
  const content = contentInput.value.trim()
  if (!content) return

  try {
    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    window.location.href = 'index.html'
  } catch (error) {
    console.log(error)
  }
})
