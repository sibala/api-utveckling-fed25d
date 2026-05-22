const todoElement = document.getElementById('todos');

// fetch('http://localhost:3000/todos') // Makes the request returns a Promise
// .then((response) => {                // First then-block handles the first Promise - checking if connection with API is established
//   console.log(response);
//   return response.json()            // Returns a new Promise for parsing JSON string. JSON.parse()
// })
// .then((data) => {                       // Second then-block handles the parsing of the JSON string
//   // Solution 1
//   // let todoHTML = ""
//   // for (let i = 0; i < data.length; i++) {
//   //   console.log(data[i])
//   //   todoHTML += `<div>${data[i].content}</div>`
//   // }
//   // todoElement.innerHTML = todoHTML;

//   // Solution 2
//   todoElement.innerHTML = data.map((todo) => `
//     <div>
//       <p>
//         <span class="date"><i>${todo.date}</i></span>
//         <span>${todo.content}</span>
//       <p>
//     </div>`
//   ).join('')
// })
// .catch((error) => {                 // Catch-block is activated when a Promise is rejected
//   console.log(error)
// })




// async function fetchTodos() {} // Hosting - JS moved this code automatically to the top
// rewrite the above code with async/await and try/catch
const fetchTodos = async () => {
  try {
    const response =  await fetch('http://localhost:3000/todos')
    // console.log(response)
    // if (!response.ok) {
    //   throw new Error('API is down')
    // }
    const data =  await response.json()
  
    console.log('This will not be shown if an error occurs with the fetch, as long as errorhandling is not implemented')
  
    todoElement.innerHTML = data.map((todo) => `
      <div>
        <p>
          <span class="date"><i>${todo.date}</i></span>
          <span>${todo.content}</span>
        <p>
      </div>`
    ).join('')
  } catch (error) {
    todoElement.innerHTML = "Opps something when wrong. Please try again later!"
    console.log(error)
  }
}

fetchTodos();





console.log('This will execute before all other console.logs. Thats because the Fetch is an asynchronous operation')