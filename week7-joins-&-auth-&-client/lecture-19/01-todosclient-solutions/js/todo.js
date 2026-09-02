// console.log(window.location.search)
const todoTitle = document.getElementById('todo-title')
const subtasksList = document.getElementById('subtasks-list')

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
            </p>
        </div>
    `
    }).join('')
} 

fetchTodo();