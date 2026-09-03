const todoElement = document.getElementById('todos');

const fetchTodos = async () => {
  try {
    const response =  await fetch(API_URL)
    // console.log(response)
    // if (!response.ok) {
    //   throw new Error('API is down')
    // }
    const todos =  await response.json()
    // console.log(todos);
    renderTodos(todos)
  } catch (error) {
    todoElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}

fetchTodos();

function renderTodos(todos) {
  todoElement.innerHTML = todos.map((todo) => `
    <div class="d-flex justify-content-between align-items-center">
      <p class="mb-0">
        <span class="date"><i>${formateDate(todo.created_at)}</i></span>
        <a href="todo.html?id=${todo._id}">${todo.content}</a>
      </p>
      <button type="button" class="btn btn-outline-danger" onclick="deleteTodo('${todo._id}')">Delete</button>
    </div>`
  ).join('')
}  


const deleteTodo = async (id) => {
  // console.log('DELETE btn clicked with id: ' + id)

  try {
    await fetch(API_URL + `/${id}`, {
      method: 'DELETE'
    })
    fetchTodos()
  } catch (error) {
    todoElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}
