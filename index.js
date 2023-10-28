const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000
const connection = require('./database/database')
const User = require('./User/User')

connection.authenticate().then(()=>{
    console.log('sucess')
}).catch(e=>{
    console.log(e)
})
var allRooms = ['games','devs','sala18']

io.on('connect',(socket)=>{
    
    for(let i=0; i<allRooms.length;i++){
        socket.join('room'+i)
        
        socket.on('msg-room'+i,(dados)=>{
          io.to('room'+i).emit('msg-room'+i,(dados))
          
        })
    }
    
    var rooms = socket.rooms
    var allr = Array()
    rooms.forEach(element => {
        if(element.includes('room')){
            allr.push({room:element})
        }
       
    });
    socket.emit('allRooms',({allr,allRooms}))
    socket.on('disconnect',()=>{
        console.log('user: '+socket.id+': desconectou-se')
    })   
    
    
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/room/:roomNumber',(req,res)=>{
    var roomNumber = req.params.roomNumber
    res.render('room/room.ejs',{roomNumber,name:allRooms[roomNumber]})
})
app.get('/login',(req,res)=>{
    res.render('user/login.ejs')
})
app.post('/create',(req,res)=>{
    var name = req.body.name
    allRooms.push(name)
    res.redirect('/')
})
http.listen(port,()=>{
    console.log('server running on port:'+port)
})
