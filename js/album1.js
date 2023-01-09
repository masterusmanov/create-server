let title = document.querySelector('#title');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { title } = event.target;
    fetch('http://localhost:1987/create_album', {
        method: "POST",
        body: JSON.stringify({
            title: title.value
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
    location.href = '../html/albums.html'
});