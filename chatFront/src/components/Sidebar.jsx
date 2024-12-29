import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Sidebar = ({setchatInitiated , setChats  , setReceiverId}) => {
    const navigate = useNavigate() ;
    const [users , setUsers] = useState([]);

    const handleLogout = ()=>{
      window.localStorage.removeItem("chat-token")
      window.localStorage.removeItem("userId")
      navigate('/')

    }
    useEffect(() => {
        const fetchUsers = async() => {
         try{ 
            
        const usersFetched = await  axios.get('http://localhost:3000/chat/users',  
      {  headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`,
        }}, );
        console.log(usersFetched)
        setUsers(usersFetched.data.users);

        
        }catch(err){
            navigate('/')
            console.log(err)
        }}

        fetchUsers();
    },[])


    const  startChat =async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chat/message/read/${id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('chat-token')}`,
            },
          }
        );
          setChats(response.data)
        
      } catch (error) {
        if(error.response.data.message === "Conv Not found"){ //they talk for the first time
          setChats([])}
        console.log(error);
      }

       
       setchatInitiated(true);
       setReceiverId(id)

     
    }
  return (
    <div className='w-1/4 bg-black p-4 bg-opacity-70 relative'>
      <input type="text" placeholder='Search' className='w-full p-2 border rounded'/>
      
      {users.length > 0 ? (
        <div className='space-y-4'>
          {users.map(user =>
        <div key={user._id} 
        onClick={()=> startChat(user._id)}
        className='flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer'>
          <img src={`http://localhost:3000/images/${user.image}`} alt="User Image" className='w-20 h-20  rounded-full text-sm font-bold'/>
        <span className='text-white text-sm font-bold'>{user.username}</span>
           </div>
           )}
           </div>

      ) :(
      <div> 
        <p className='text-white font-bold'>No Users Existed </p>
      </div>
      )}
      <button onClick={handleLogout}
      className='absolute bottom-1 right-1 left-1 rounded hover:bg-blue-700 bg-blue-500 text-white'>Logout</button>

    </div>
  )
}

export default Sidebar
