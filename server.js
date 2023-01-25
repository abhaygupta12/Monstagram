const express = require('express');
const app = express();
const mongoose = require('mongoose');

const {MONGODB_URI} = require('./config');
// require('./models/user_model');
// app.use(express.json());
// app.use(require('./routes/authentication'));
// var WebSocketServer = require('ws').Server; 

// //creating a websocket server at port 9090 
// var wss = new WebSocketServer({server: app}); 

// //all connected to the server users 
// var users = {};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", '*');
    next();
});


mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',()=>{
    console.log("some error",error)
})
require('./models/user_model');
require('./models/post_model');


// app.on('connection',(socket)=>{
//     console.log("a user connect");
//     socket.on("message",(ms) =>{
//         app.emit("message",ms)
//     })
// })

app.use(express.json());
app.use(require('./routes/authentication'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/userRoute'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});

