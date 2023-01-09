let name = document.querySelector('#name');
let email = document.querySelector('#email');
let body = document.querySelector('#body');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { name, email, body } = event.target;
    fetch('http://localhost:1987/create_comment', {
        method: "POST",
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            body: body.value
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
    location.href = '../html/comments.html'
});