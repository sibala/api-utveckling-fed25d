// console.log(window.location.search)
const todoTitle = document.getElementById('todo-title')
const subtasksList = document.getElementById('subtasks-list')
const subtaskForm = document.getElementById('subtask-form')


const params = new URLSearchParams(window.location.search)
// console.log(params);
// console.log(params.get('id'));
const todoId = params.get('id');


const fetchTodo = async () => {
    try {
        const response = await fetch(API_URL + `/${todoId}`)
        const todo = await response.json();
        // console.log(todo);
        todoTitle.innerText = todo.content
        // console.log(todo.subtasks)
        renderSubtasks(todo.subtasks)
    } catch(e) {
        todoElement.innerHTML = "Opps something when wrong. Please try again later!"
        console.log(error)
    }
}

function renderSubtasks(subtasks) {
    subtasksList.innerHTML = subtasks.map(subtask => {
    return `
        <div class="${subtask.done ? 'done' : ''}">
            <p>
                <span class="date"><i>${formateDate(subtask.created_at)}</i></span>
                <span>${subtask.content}</span>
                <button type="button" class="btn btn-outline-danger ms-5" onclick="deleteSubtask('${subtask._id}')">Delete</button>
            </p>
        </div>
    `
    }).join('')
} 

fetchTodo();


const deleteSubtask = async (subtaskId) => {
  // console.log('DELETE btn clicked with id: ' + id)

  try {
    //http://localhost:3000/todos/:todoId/subtasks/:subtaskId
    await fetch(API_URL + `/${todoId}/subtasks/${subtaskId}`, {
      method: 'DELETE'
    })
    fetchTodo()
  } catch (error) {
    console.log(error)
  }
}


subtaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const contentInput = document.getElementById('subtask-content')
    // if contentInput.value returns "      hello     "
    // contentInput.value.trim() removes trailing spaces "hello"
    const content = contentInput.value.trim()

    try {
        //http://localhost:3000/todos/6a9684db623a1c80c91cdc96/subtasks
        await fetch(API_URL + `/${todoId}/subtasks`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({content})
        })
        fetchTodo()
    } catch (error) {
        console.log(error)
    }
})