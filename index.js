// const express = require('express');
// const app = express();
// const path = require('path');

// // Socket configuration
// const http = require('http');
// const socketIo = require('socket.io');
// const server = http.createServer(app); // Pass app to createServer

// const io = socketIo(server); // Correct io initialization

// // EJS configuration
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//     socket.on("send-location",(data)=>{
//         io.emit("receive-location", { id: socket.id, ...data });
//     })

//     socket.on("disconnect", () => {
//         io.emit("user-disconnect", socket.id); 
//     });

//     console.log('connected');
// });

// app.get('/', (req, res) => {
//     res.render('index.ejs');
// });

// server.listen(3000, () => {
//     console.log(`The server is running at http://localhost:3000`);
// });





const express = require('express');
const app = express();
const path = require('path');

// Socket configuration
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app); // Pass app to createServer

const io = socketIo(server); // Correct io initialization

// EJS configuration
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id);
    });
    console.log(`User connected: ${socket.id}`);
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

server.listen(3000, () => {
    console.log(`The server is running at http://localhost:3000`);
});
