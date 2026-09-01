const todoElement = document.getElementById('todos');

const fetchTodos = async () => {
  try {
    const response =  await fetch('http://localhost:3000/todos')
    // console.log(response)
    // if (!response.ok) {
    //   throw new Error('API is down')
    // }
    const data =  await response.json()
    console.log(data);
  
    console.log('This will not be shown if an error occurs with the fetch, as long as errorhandling is not implemented')
  
    todoElement.innerHTML = data.map((todo) => `
      <div class="d-flex justify-content-between align-items-center">
        <p class="mb-0">
          <span class="date"><i>${formateDate(todo.created_at)}</i></span>
          <a href="todo.html?id=${todo._id}">${todo.content}</a>
        </p>
      </div>`
    ).join('')
  } catch (error) {
    todoElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}
fetchTodos();

console.log('This will execute before all other console.logs. Thats because the Fetch is an asynchronous operation')