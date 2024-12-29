import axios from 'axios';
import React, { useState } from 'react';


const Form = ({receiverId , setChats , chats}) => {
    const [message , setMessage] = useState('');
    const userId = window.localStorage.getItem("userId")

    const sendMessage = async (e) => {
      e.preventDefault();
        try {
          const response = await axios.post(
            `http://localhost:3000/chat/message/send/${receiverId}`,
            { content: message },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
              },
            }
          );
            setChats([...chats , {content:message , sender : userId}]) //to display the messsage at the view of the one who sent it 

            setMessage('');
        } catch (error) {
           console.log(error)
          }

           
        }
    
  return (
    <div className="p-4 fixed absolute bottom-0 right-0 left-0 bg-white bg-opacity-20">
   <form className=' flex items-center ' onSubmit={sendMessage}> <input
        type="text"
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 border rounded-l-lg"
      />
    
      <button type='submit'className="p-2 bg-blue-500 text-white rounded-r-lg">
        Send
      </button>
      </form>  
    </div>
  );
};

export default Form;
