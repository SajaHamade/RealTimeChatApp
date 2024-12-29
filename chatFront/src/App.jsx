import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Chat from './Pages/Chat'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000') //inistinitaite a connection between the socket and our frontend

function App() {
 

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} ></Route>
    <Route path='/chat' element={<Chat socket={socket}/>} ></Route>

  </Routes>
  </BrowserRouter>
  )
}

export default App
