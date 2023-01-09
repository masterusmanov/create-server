function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:1987/get_comments', {
    method: "POST"
}).then(res => res.json())
    .then(comments => {
        for (let comment of comments) {
            let [tr, td1, td2, td3, td4, td5, i, i2] = createElement('tr', 'td', 'td', 'td', 'td', 'td', 'i', 'i');
            td1.textContent = comment.id;
            td2.textContent = comment.name;
            td3.textContent = comment.email;
            td4.textContent = comment.body;

            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.addEventListener('click', () => {
                fetch(`http://localhost:1987/delete_comment/${comment.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });

            i2.className += 'fa fa-edit text-primary ml-3'
            i2.setAttribute("data-target", "#myModal")
            i2.setAttribute("data-toggle", "modal")
            i2.style.cursor = 'pointer';
            i2.addEventListener('click', () => {
                name.value = comment.name
                email.value = comment.email
                body.value = comment.body
                localStorage.setItem('postId', comment.id)
            });

            td5.append(i, i2)
            tr.append(td1, td2, td3, td4, td5)
            tbody.append(tr)
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { name, email, body } = event.target;
            fetch(`http://localhost:1987/update_comment/${localStorage.getItem('postId')}`, {
                method: "POST",
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    body: body.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });