console.log('############## Array.filter()  ###############')

let numbers = [-10, -2, 3, 4, 5];
// Return all positive numbers
// const search = numbers.filter(function(number) {
//     return number > 0 
// })
// Rewrites the above example to arrow function with shorthand
const searchPositiveNumbers = numbers.filter(number => number > 0 )
console.log(searchPositiveNumbers) // Exprected output: Array [ 3, 4, 5 ]


const words = ['JavaScript', 'PHP', 'Ruby', 'Pyhton', 'Java', 'C#']
const filteredWords = words.filter( word => word.length > 4 )
console.log(filteredWords); // Expected output: ['JavaScript', 'Python']



console.log('############## Array.map()  ###############')

numbers = [1, 2, 3, 4, 5];

// May loop through an array with .map()
const newArray1 = numbers.map(number => number)
const newArray2 = numbers.map(number => number * 10)
const newArray3 = numbers.map(number => `<li>${number}</li>`)
const newArray3toHTMLString= numbers.map(number => `<li>${number}</li>`).join('')


console.log(newArray1) // Expected output: [1, 2, 3, 4, 5]
console.log(newArray2) // Expected output: [10, 20, 30, 40, 50]
console.log(newArray3) // Expected output: ['<li>1</li>', '<li>2</li>', '<li>3</li>', '<li>4</li>', '<li>5</li>']
console.log(newArray3toHTMLString) // Expected output: '<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>'
document.getElementById('list').innerHTML = newArray3toHTMLString


console.log("################# Array.map() with tasks/subtasks example ###############")

let rows = [
	{
		"todo_id": 1,
		"todo_content": "Handla mat",
		"todo_done": 0,
		"todo_created_at": "2026-06-02T06:52:32.000Z",
		"subtask_id": 1,
		"subtask_todo_id": 1,
		"subtask_content": "Gurka - updated",
		"subtask_done": 1,
		"subtask_created_at": "2026-06-04T06:34:19.000Z"
	},
	{
		"todo_id": 1,
		"todo_content": "Handla mat",
		"todo_done": 0,
		"todo_created_at": "2026-06-02T06:52:32.000Z",
		"subtask_id": 2,
		"subtask_todo_id": 1,
		"subtask_content": "Mjölk",
		"subtask_done": 0,
		"subtask_created_at": "2026-06-04T06:34:31.000Z"
	},
	{
		"todo_id": 1,
		"todo_content": "Handla mat",
		"todo_done": 0,
		"todo_created_at": "2026-06-02T06:52:32.000Z",
		"subtask_id": 5,
		"subtask_todo_id": 1,
		"subtask_content": "Ägg",
		"subtask_done": 0,
		"subtask_created_at": "2026-06-04T06:41:15.000Z"
	}
]


let formatedTodo = {
    "todo_id":          rows[0].todo_id,
    "todo_content":     rows[0].todo_content,
    "todo_done":        rows[0].todo_done,
    "todo_created_at":  rows[0].todo_created_at,
    "subtasks":         rows.map(row => ({
        "subtask_id":           row.subtask_id,
		"subtask_todo_id":      row.subtask_todo_id,
		"subtask_content":      row.subtask_content,
		"subtask_done":         row.subtask_done,
		"subtask_created_at":   row.subtask_created_at
    }))
}

console.log(formatedTodo);