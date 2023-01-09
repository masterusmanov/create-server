let title = document.querySelector('#title');
let completed = document.querySelector('#completed');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { title, completed } = event.target;
    fetch('http://localhost:1987/create_todo', {
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            completed: completed.value,
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
    location.href = '../html/todos.html'
});