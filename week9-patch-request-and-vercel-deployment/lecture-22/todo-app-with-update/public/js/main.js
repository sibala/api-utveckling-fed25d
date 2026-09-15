const todoElement = document.getElementById('todos');


const fetchTodos = async () => {
  try {
    const response =  await fetch(`${API_URL}/todos`)
    // console.log(response)
    // if (!response.ok) {
    //   throw new Error('API is down')
    // }
    const data =  await response.json()
  
    console.log('This will not be shown if an error occurs with the fetch, as long as errorhandling is not implemented')
  
    todoElement.innerHTML = data.map((todo) => `
      <div class="d-flex justify-content-between align-items-center">
        <p class="mb-0">
          <span class="date"><i>${todo.created_at}</i></span>
          <a href="todo.html?id=${todo._id}">${todo.content}</a>
        </p>
        <div>
          <a href="update.html?id=${todo._id}" class="btn btn-sm btn-outline-primary">Update</a>
          <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteTodo('${todo._id}')">Delete</button>
        </div>
      </div>`
    ).join('')
  } catch (error) {
    todoElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}

const deleteTodo = async (id) => {
  try {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE'
    })
    fetchTodos()
  } catch (error) {
    console.log(error)
  }
}

fetchTodos();





console.log('This will execute before all other console.logs. Thats because the Fetch is an asynchronous operation')