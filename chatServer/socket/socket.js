import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()

const onlineUsers = {}


const server= http.createServer(app) // Converts the Express app into an HTTP server.
export const io = new Server(server , { //to bind the http server and socket server to enable  communication.
    cors : {
        origin : "*", 
        methods :["GET" , "POST"]
    }
} )


export const GetReceiverSocketId = (receiverId) => {
    return onlineUsers[receiverId]
}



io.on('connection', (socket) => {  // Event listener that triggers when a new client connects to the Socket.io server.
                                // socket: Represents the connected client and allows interaction with them.
   
    console.log("user joined" , socket.id); //socket.id: A unique ID automatically generated for every connected client.

    socket.on('join', (receiverId)=> { //Maps the user's ID (receiverId) to their socket.id, enabling you to target them specifically for real-time events.
        onlineUsers[receiverId] = socket.id
        console.log("Receiver ", receiverId , "socket id: " , socket.id ) })
})




export {app , server }