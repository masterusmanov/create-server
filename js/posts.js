function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:1987/get_posts', {
    method: "POST"
}).then(res => res.json())
    .then(posts => {
        for (let post of posts) {
            let [tr, td1, td2, td3, td4, i, i2] = createElement('tr', 'td', 'td', 'td', 'td', 'i', 'i');
            td1.textContent = post.id;
            td2.textContent = post.title;
            td3.textContent = post.body;

            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.addEventListener('click', () => {
                fetch(`http://localhost:1987/delete_post/${post.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });

            i2.className += 'fa fa-edit text-primary ml-3';
            i2.setAttribute("data-target", "#myModal");
            i2.setAttribute("data-toggle", "modal");
            i2.style.cursor = 'pointer';
            i2.addEventListener('click', () => {
                title.value = post.title
                body.value = post.body
                localStorage.setItem('postId', post.id)
            });

            td4.append(i, i2)
            tr.append(td1, td2, td3, td4)
            tbody.append(tr)
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { title, body } = event.target;
            fetch(`http://localhost:1987/update_post/${localStorage.getItem('postId')}`, {
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    body: body.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });