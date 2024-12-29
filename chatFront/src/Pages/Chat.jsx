import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Form from '../components/Form'

const Chat = ({socket}) => {
  const chatContainerRef = useRef(null);

  const [chatInitiated , setchatInitiated] = useState(false)
  const [chats , setChats] = useState([]);
  const [receiverId , setReceiverId] = useState()
  const userId = window.localStorage.getItem("userId")


  useEffect(()=>{
    console.log("Emitting join event");
    socket.emit('join',userId) ; //The emit method allows the client to send data to the server, along with a specific event name (join in this case).
                                 //this will trigger the listener in the socket.js (socket is listening to a join event)

  },[]) //because Dependency array is empty it runs only once when the component first mounts, so it won't re-run during  re-renders.


  useEffect(()=>{
    const handleNewMessages = (message)=> {
      if(receiverId === message.sender) //to display the message only to the receiver 
     {
       setChats(state => [...state, {sender:message.sender , content : message.content}])
      
      }
    }
      socket.on('new message', handleNewMessages)

      //to end the function

      return () => {
        socket.off('new message',handleNewMessages)
      }

  },[socket , receiverId]);

    // Scroll to the bottom whenever the chats state changes
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [chats]);
   
  return (
  
    <div className="flex items-center justify-center h-screen bg-gray-100"> 
    <div
      style={{ backgroundImage: "url('/ChatBg.jpg')" }}
      className="bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex " > 

<Sidebar 
 setchatInitiated = {setchatInitiated}
  setChats = {setChats}
  setReceiverId={setReceiverId}

  />

<div className='w-3/4 bg-white flex flex-col bg-opacity-20 relative' >{
chatInitiated ? 
<> 
<div className="overflow-y-auto mb-20"  ref={chatContainerRef}>
  {chats &&
    chats.map((chat, index) => (
      <div
        key={index}
        className={`flex px-4 ${
          chat.sender === userId ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`p-2 my-2 rounded ${
            chat.sender === userId ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {chat.content}
        </div>
      </div>
    ))}

</div>

  
  <Form 
  receiverId= {receiverId}
  setChats = {setChats}
  chats = {chats}
  />
</>
:
<div className='flex justify-center items-center h-full'>
  <h2 className='text-3xl py-3 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg'>Welcome</h2></div>
}</div>


      </div >
      </div>
  )
}

export default Chat
