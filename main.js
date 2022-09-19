const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const users = [];

app.set('views', './views');
app.use(express.static('views'))

app.get('/', (req, res) => {
	return res.render('index.html')
})

io.on('connection', socket => {
	socket.broadcast.emit('send', users)
	socket.on('message', data => {
		console.log(data);
		socket.broadcast.emit('replay', data);
		socket.emit('preplay', data);
	})
	socket.on('username', data => {
		socket.broadcast.emit('join', data);
	})
	socket.on('select', data => {
		socket.broadcast.emit('selected', data);
	})
	socket.on('user', data => {
		socket.on('disconnect', () => {
		
			io.emit('dis', data)
		})

	})
})

server.listen(5000, ()=> {
	console.log('working on http://localhost:5000');
})


