let title = document.querySelector('#title');
let url = document.querySelector('#url');
let thumbnailUrl = document.querySelector('#thumbnailUrl');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let { title, url, thumbnailUrl } = event.target;
    fetch('http://localhost:1987/create_photo', {
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            url: url.value,
            thumbnailUrl: thumbnailUrl.value
        })
    }).then(res => res.json())
    .then(info => alert(info.msg))
    .catch(err=>console.log(err))
    location.href = '../html/photos.html'
});