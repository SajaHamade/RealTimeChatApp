//because we added type:"module" in the oacakage.json (before the scripts section) , then now we can directly write
//import express and then use it without the need of the require thing
import express from 'express'
import cors from 'cors'
import Connect from './db/connection.js'
import dotenv from 'dotenv';
dotenv.config();

import AuthRouter from './routes/auth.js'
import UserRouter from './routes/user.js'
import MessageRouter from './routes/message.js'


import {app , server} from './socket/socket.js'

app.use(cors());

app.use(express.json());
app.use(express.static('public'))//public is the name of the folder containing the images 
                         // Express will automatically serve any files inside the public directory, and you can access them through URLs.

app.use('/chat/user' , AuthRouter)
app.use('/chat/users' , UserRouter)
app.use('/chat/message' , MessageRouter)

server.listen(process.env.PORT, () =>{
    Connect();
    console.log("Server is Running ");
})


