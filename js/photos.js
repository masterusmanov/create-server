function createElement(...tegs) {
    let store = []
    for (let teg of tegs) {
        let createdTeg = document.createElement(`${teg}`)
        store.push(createdTeg)
    }
    return store
}

fetch('http://localhost:1987/get_photos', {
    method: "POST"
}).then(res => res.json())
    .then(photos => {
        for (let photo of photos) {
            let [tr, td1, td2, td3, td4, td5, i, i2] = createElement('tr', 'td', 'td', 'td', 'td', 'td', 'i', 'i');
            td1.textContent = photo.id;
            td2.textContent = photo.title;
            td3.textContent = photo.url;
            td4.textContent = photo.thumbnailUrl;

            i.className += 'fa fa-trash text-danger';
            i.style.cursor = 'pointer';
            i.addEventListener('click', () => {
                fetch(`http://localhost:1987/delete_photo/${photo.id}`, {
                    method: "POST"
                }).then(res => res.json())
                    .then(info => alert(info.msg))
            });

            i2.className += 'fa fa-edit text-primary ml-3';
            i2.setAttribute("data-target", "#myModal");
            i2.setAttribute("data-toggle", "modal");
            i2.style.cursor = 'pointer';
            i2.addEventListener('click', () => {
                title.value = photo.title
                url.value = photo.url
                thumbnailUrl.value = photo.thumbnailUrl
                localStorage.setItem('photoId', photo.id)
            });

            td5.append(i, i2);
            tr.append(td1, td2, td3, td4, td5);
            tbody.append(tr);
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            let { title, url, thumbnailUrl } = event.target;
            fetch(`http://localhost:1987/update_photo/${localStorage.getItem('photoId')}`, {
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    url: url.value,
                    thumbnailUrl: thumbnailUrl.value
                })
            }).then(res => res.json())
                .then(info => alert(info.msg))

        });
    });