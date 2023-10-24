const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000

io.on('connect',(socket)=>{
    //room1
    console.log(socket.id)

    socket.join('room1')
    socket.on('msgs',(dados)=>{
        io.to('room1').emit('msg',(dados))
    })
    //room2
    socket.join('room2')
    socket.on('msg-room2',(dados)=>{
      io.to('room2').emit('msg-room2',(dados))
    })


    socket.on('disconnect',()=>{
        console.log('user: '+socket.id+': desconectou-se')
    })
})


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json)
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/room',(req,res)=>{
    res.render('room.ejs')
})
app.get('/room2',(req,res)=>{
    res.render('room2.ejs')
})
app.post('/create-room',(req,res)=>{
    var name = req.name
})

http.listen(port,()=>{
    console.log('server running on port:'+port)
})