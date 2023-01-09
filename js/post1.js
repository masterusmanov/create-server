let title = document.querySelector('#title');
let body = document.querySelector('#body');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { title, body } = event.target;
    fetch('http://localhost:1987/create_post', {
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            body: body.value
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
    location.href = '../html/posts.html'
});