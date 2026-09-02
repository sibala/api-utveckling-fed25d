const createForm = document.getElementById('create-form')

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contentInput = document.getElementById('todo-content')
    const content = contentInput.value.trim()
    // console.log(contentInput)
    // console.log(content)
    if (!content) return

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content: content})
        })

        window.location.href = "index.html"
    } catch (error) {
        todoElement.innerHTML = "Opps something when wrong. Please try again later!"
        console.log(error)
    }
})