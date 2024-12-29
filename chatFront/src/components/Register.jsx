import React, { useState } from 'react'
import axios from 'axios'

const Register = ({openLogin}) => {
    
 const [username , setUserName] = useState("")
 const [password, setPassword] = useState("");
 const [file , setFile] = useState(null)

 const handleSubmit = async(e) => {
  e.preventDefault();
      const formdata = new FormData()
      formdata.append("username",username)
      formdata.append("password",password)
      formdata.append("image",file) 

      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
    }

      try{
        const response =  await axios.post('http://localhost:3000/chat/user/register' , formdata)
        console.log(response);
        if(response.data.msg === "success"){
          openLogin();
         
        }


        if(response.data.msg === "User already Exists"){
         alert("User already exists")
         
        }



      }  catch (err){
        console.log(err)
      }

      
     
 }
  return (
    


    <div>
       <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

       <form onSubmit={handleSubmit}>
       <div className='mb-4'>
        <label className='block text-gray-700'htmlFor='name'>UserName:</label>
        <input onChange={(e)=> setUserName(e.target.value)} className='w-full px-3 py-2 border' type='text' placeholder='Enter Your Username'/>
       </div>

       <div>
        <label className='block text-gray-700'htmlFor='password'>Password:</label>
        <input onChange={(e)=> setPassword(e.target.value)} className='w-full px-3 py-2 border'type='password' placeholder='******'/>
       </div>


       <div className="mb-4">
         <label className="block text-gray-700">Upload Image</label>
         <input
          type="file" onChange={(e)=> setFile(e.target.files[0])}
            className="border p-2 block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-500 file:text-white
               hover:file:bg-blue-700"
                />
         </div>




       <div className='mb-4'>
        <button  type='submit' className='w-full bg-blue-600 text-white py-2'>Register</button>
       </div>
        </form>
 
        <div className='text-center'>
            <span className='text-gray-700'>Already have nan Accoint ?</span>
            <button className='text-blue-800' onClick={openLogin}>Login</button>
        </div>




    </div>
  )
}

export default Register
