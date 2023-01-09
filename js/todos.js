function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:1987/get_todos', {
    method: "POST"
}).then(res => res.json())
    .then(todos => {
        for (let todo of todos) {
            let [tr, td1, td2, td3, td5, i, i2] = createElement('tr', 'td', 'td', 'td', 'td', 'i', 'i');
            td1.textContent = todo.id;
            td2.textContent = todo.title;
            td3.textContent = todo.completed;

            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.addEventListener('click', () => {
                fetch(`http://localhost:1987/delete_todo/${todo.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });

            i2.className += 'fa fa-edit text-primary ml-3'
            i2.setAttribute("data-target", "#myModal")
            i2.setAttribute("data-toggle", "modal")
            i2.style.cursor = 'pointer';
            i2.addEventListener('click', () => {
                title.value = todo.title
                completed.value = todo.completed
                localStorage.setItem('todoId', todo.id)
            });

            td5.append(i, i2)
            tr.append(td1, td2, td3, td5)
            tbody.append(tr)
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { title, completed } = event.target;
            fetch(`http://localhost:1987/update_todo/${localStorage.getItem('todoId')}`, {
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    completed: completed.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });