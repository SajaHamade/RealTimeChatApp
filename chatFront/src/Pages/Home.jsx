import React, { useEffect, useState } from 'react';
import Model from '../components/Model';
import Register from '../components/Register';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    const [isModelOpen , setIsModelOpen] = useState(false);
    const [isLogin , setIsLogin] = useState(true) ;

    const openSignup = () => {
        setIsModelOpen(true)
        setIsLogin(false)
    }

    const openLogin = () => {
        setIsModelOpen(true)
        setIsLogin(true)
    }

    const navigate = useNavigate();
    useEffect(() => {
      const verifyUser = async () => {
        try {
          const token = window.localStorage.getItem('chat-token') ;
          console.log(token)
          const response = await axios.get('http://localhost:3000/chat/user/verify', {
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('chat-token')}`,
            },
          });
          if (response.data.msg === "success") {
            navigate('/chat'); // Navigate to chat on success
          }
        } catch (error) {
        
          console.error("Error verifying user:", error);
        }
      };
    
      verifyUser(); // Call the async function
    }, []);
    

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100"> 
      <div
        style={{ backgroundImage: "url('/ChatBg.jpg')" }}
        className="bg-cover w-2/4 h-screen rounded-lg flex items-center justify-center" > 
        <div className='text-center'> 
          <h2 className='text-6xl py-3 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg'>Welcome</h2>
          <button onClick={()=> setIsModelOpen(true)} className='p-3 hover:bg-blue-800 rounded-lg mt-2 bg-blue-600 text-white text3'>Login / Register</button>
        </div>
      </div>

      <Model  isModelOpen = {isModelOpen} setIsModelOpen={setIsModelOpen}>
        {isLogin ? <Login  openSignup={openSignup}/> : <Register openLogin={openLogin}/>}
  


        </Model>

    </div>
  );
};

export default Home;
