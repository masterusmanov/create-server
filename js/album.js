function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:1987/get_albums', {
    method: "POST"
}).then(res => res.json())
    .then(albums => {
        for (let album of albums) {
            let [tr, td1, td2, td4, i, i2] = createElement('tr', 'td', 'td', 'td', 'i', 'i');
            td1.textContent = album.id;
            td2.textContent = album.title;
            
            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.addEventListener('click', () => {
                fetch(`http://localhost:1987/delete_album/${album.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });

            i2.className += 'fa fa-edit text-primary ml-3'
            i2.setAttribute("data-target", "#myModal")
            i2.setAttribute("data-toggle", "modal")
            i2.style.cursor = 'pointer';
            i2.addEventListener('click', () => {
                title.value = album.title
                localStorage.setItem('albumId', album.id)
            });

            td4.append(i, i2)
            tr.append(td1, td2, td4)
            tbody.append(tr)
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { title } = event.target;
            fetch(`http://localhost:1987/update_album/${localStorage.getItem('albumId')}`, {
                method: "POST",
                body: JSON.stringify({
                    title: title.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });