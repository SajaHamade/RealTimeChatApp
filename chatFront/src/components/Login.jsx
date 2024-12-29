import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = ({openSignup}) => {
    
 const [username , setUserName] = useState("")
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async(e) => {
  e.preventDefault();
   try{
        const response =  await axios.post('http://localhost:3000/chat/user/login' , {username , password})
        console.log(response);
        if(response.data.msg === "success"){
          window.localStorage.setItem('chat-token' , response.data.token)
          window.localStorage.setItem('userId' , response.data.user._id)
          navigate('/chat')
        }
        else if(response.data.msg === "Username Not Found"){
          alert("Username Not Found")

        } else if(response.data.msg === "Incorrect Password"){
          alert("Incorret Password")

        }

      }  catch (err){
        console.log(err)
      }

      
     
 }
  return (
    


    <div>
       <h2 className='text-2xl font-bold mb-4'>Login</h2>

       <form onSubmit={handleSubmit}>
       <div className='mb-4'>
        <label className='block text-gray-700'htmlFor='name'>UserName:</label>
        <input onChange={(e)=> setUserName(e.target.value)} className='w-full px-3 py-2 border' type='text' placeholder='Enter Your Username'/>
       </div>

       <div>
        <label className='block text-gray-700'htmlFor='password'>Password:</label>
        <input onChange={(e)=> setPassword(e.target.value)} className='w-full px-3 py-2 border'type='password' placeholder='******'/>
       </div>

       <div  className='mb-4 flex items-center justify-between'>
        <label className='inline-flex items-center' htmlFor='rememberme'>
        <input className='form-checkbox' type='checkbox'/>
        <span className='ml-2 text-gray-700'>Remember Me</span>
        </label>
        <a className='tex-red-800' href="#">Forgot Password?</a>
       </div>

       <div className='mb-4'>
        <button type='submit' className='w-full bg-blue-600 text-white py-2'>Login</button>
       </div>
        </form>

        <div className='text-center'>
            <span className='text-gray-700'>Don't have nan Accoint ?</span>
            <button className='text-blue-800' onClick={openSignup}>Sign Up</button>
        </div>


    </div>
  )
}

export default Login
