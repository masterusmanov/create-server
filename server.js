import http from 'http';
import { read_post, write_post } from './fs/fs_api.js';
import url from 'url';

let options = { "Content-Type": "aplication/json", "Access-Control-Allow-Origin": "*" };
http.createServer((req, res) => {
    if (req.method === 'POST') {
        if (req.url == '/get_posts') {
            let posts = read_post('posts.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(posts))
        };
        if (req.url == '/create_post') {
            req.on('data', (chunk) => {
                let new_post = JSON.parse(chunk);
                let posts = read_post('posts.json');
                posts.push({ id: posts.at(-1).id + 1, ...new_post });
                write_post('posts.json', posts);
                res.writeHead(200, options);
                res.end('Created post!!!');
            });
        };
        let post_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_post/${post_id}`) {
            req.on('data', (chunk) => {
                let update_post = JSON.parse(chunk);
                let posts = read_post('posts.json');
                let { title, body } = update_post;
                posts.forEach(post => {
                    if (post.id == post_id) {
                        title && (post.title = title);
                        body && (post.body = body);
                    }
                });
                write_post('posts.json', posts);
                res.writeHead(200, options);
                res.end('Post updated!');
            });
        };
        if (req.url === `/delete_post/${post_id}`) {
            let posts = read_post('posts.json');
            posts.forEach((post, idx) => {
                if (post.id == post_id) {
                    posts.splice(idx, 1);
                };
            });
            write_post('posts.json', posts);
            res.writeHead(200, options);
            res.end('Post deleted!');
        };
        // ============================================================================================;
        if (req.url == '/get_comments') {
            let comments = read_post('comments.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(comments))
        };
        if (req.url == '/create_comment') {
            req.on('data', (chunk) => {
                let new_comment = JSON.parse(chunk);
                let comments = read_post('comments.json');
                comments.push({ id: comments.at(-1).id + 1, ...new_comment });
                write_post('comments.json', comments);
                res.writeHead(200, options);
                res.end('Created comment!!!');
            });
        };
        let comment_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_comment/${comment_id}`) {
            req.on('data', (chunk) => {
                let update_comment = JSON.parse(chunk);
                let comments = read_post('comments.json');
                let { name, email, body } = update_comment;
                comments.forEach(comment => {
                    if (comment.id == comment_id) {
                        name && (comment.name = name);
                        email && (comment.email = email);
                        body && (comment.body = body);
                    }
                });
                write_post('comments.json', comments);
                res.writeHead(200, options);
                res.end('Comment updated!');
            });
        };
        if (req.url === `/delete_comment/${post_id}`) {
            let comments = read_post('comments.json');
            comments.forEach((comment, idx) => {
                if (comment.id == comment_id) {
                    comments.splice(idx, 1);
                };
            });
            write_post('comments.json', comments);
            res.writeHead(200, options);
            res.end('Comment deleted!');
        };
        // ============================================================================================;
        if (req.url == '/get_albums') {
            let albums = read_post('album.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(albums))
        };
        if (req.url == '/create_album') {
            req.on('data', (chunk) => {
                let new_album = JSON.parse(chunk);
                let albums = read_post('album.json');
                albums.push({ id: albums.at(-1).id + 1, ...new_album });
                write_post('album.json', albums);
                res.writeHead(200, options);
                res.end('Created album!!!');
            });
        };
        let album_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_album/${album_id}`) {
            req.on('data', (chunk) => {
                let update_album = JSON.parse(chunk);
                let albums = read_post('album.json');
                let { title } = update_album;
                albums.forEach(album => {
                    if (album.id == album_id) {
                        title && (album.title = title);
                    }
                });
                write_post('album.json', albums);
                res.writeHead(200, options);
                res.end('album updated!');
            });
        };
        if (req.url === `/delete_album/${post_id}`) {
            let albums = read_post('album.json');
            albums.forEach((album, idx) => {
                if (album.id == album_id) {
                    albums.splice(idx, 1);
                };
            });
            write_post('album.json', albums);
            res.writeHead(200, options);
            res.end('album deleted!');
        };
        // ============================================================================================;
        if (req.url == '/get_photos') {
            let photos = read_post('photos.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(photos))
        };
        if (req.url == '/create_photo') {
            req.on('data', (chunk) => {
                let new_photo = JSON.parse(chunk);
                let photos = read_post('photos.json');
                photos.push({ id: photos.at(-1).id + 1, ...new_photo });
                write_post('photos.json', photos);
                res.writeHead(200, options);
                res.end('Created photo!!!');
            });
        };
        let photo_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_photo/${photo_id}`) {
            req.on('data', (chunk) => {
                let update_photo = JSON.parse(chunk);
                let photos = read_post('photos.json');
                let { title, url, thumbnailUrl } = update_photo;
                photos.forEach(photo => {
                    if (photo.id == photo_id) {
                        title && (photo.title = title);
                        url && (photo.url = url);
                        thumbnailUrl && (photo.thumbnailUrl = thumbnailUrl);
                    }
                });
                write_post('photos.json', photos);
                res.writeHead(200, options);
                res.end('photo updated!');
            });
        };
        if (req.url === `/delete_photo/${post_id}`) {
            let photos = read_post('photos.json');
            photos.forEach((photo, idx) => {
                if (photo.id == photo_id) {
                    photos.splice(idx, 1);
                };
            });
            write_post('photos.json', photos);
            res.writeHead(200, options);
            res.end('photo deleted!');
        };
        // ============================================================================================;
        if (req.url == '/get_todos') {
            let todos = read_post('todos.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(todos))
        };
        if (req.url == '/create_todo') {
            req.on('data', (chunk) => {
                let new_todo = JSON.parse(chunk);
                let todos = read_post('todos.json');
                todos.push({ id: todos.at(-1).id + 1, ...new_todo });
                write_post('todos.json', todos);
                res.writeHead(200, options);
                res.end('Created todo!!!');
            });
        };
        let todo_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_todo/${todo_id}`) {
            req.on('data', (chunk) => {
                let update_todo = JSON.parse(chunk);
                let todos = read_post('todos.json');
                let { title, completed } = update_todo;
                todos.forEach(todo => {
                    if (todo.id == todo_id) {
                        title && (todo.title = title);
                        completed && (todo.completed = completed);
                    }
                });
                write_post('todos.json', todos);
                res.writeHead(200, options);
                res.end('todo updated!');
            });
        };
        if (req.url === `/delete_todo/${post_id}`) {
            let todos = read_post('todos.json');
            todos.forEach((todo, idx) => {
                if (todo.id == todo_id) {
                    todos.splice(idx, 1);
                };
            });
            write_post('todos.json', todos);
            res.writeHead(200, options);
            res.end('todo deleted!');
        };
    }

}).listen(1987, () => {
    console.log('Server is running on the 1987 port!');
})