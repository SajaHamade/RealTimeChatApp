import multer from 'multer'
import UserModel from '../models/User.js'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const storage = multer.diskStorage({
    destination:(req,res,cb) =>{
        cb(null, 'public/images' )
    },
    filename:(req , res , cb)=>{
        cb(null , res.fieldname + "_" + Date.now() + path.extname(res.originalname))
    }
})


export const upload = multer({
    storage : storage 
})



  export async function login (req,res) {
 try {

    console.log("Hello from the login function")
    const {username , password} = req.body ; 
    console.log(username ,":",password);



    const userExist = await UserModel.findOne({username})

    if(!userExist){
        console.log("Username Not Found");
        return res.status(400).json({msg:"Username Not Found "})
    }    
    
    const matchpassword = await bcrypt.compare(password, userExist.password)
    if (!matchpassword) {
        console.log("Incorrect Password")
        return res.status(400).json({msg:"Incorrect Password"})
    }


    const token = jwt.sign({id: userExist._id} , process.env.JWT_KEY , {
        expiresIn : '1h'
    })

    return res.status(200).json({msg:"success" , token , user:{_id:userExist._id , username :userExist.username } })

   
 } catch (error) {
    console.log(error)
    return res.status(500).json({msg :"error"+error})
 }
}


async function Register (req,res) {
    try {
   
       console.log("Hello from the register function")
       const {username , password} = req.body ; 
       const file = req.file.filename ;
   
       const userExist = await UserModel.findOne({username})
       if (userExist) {
           console.log("user already exists")
           return res.status(400).json({msg:"User already Exists "})
       }
   
       const hashpassword = await bcrypt.hash(password, 10)
       const newUser = new UserModel({
           username : username ,
           password : hashpassword,
           image : file
       })
   
       newUser.save();
   
       return res.status(200).json({msg:"success"})
   
   
       
    } catch (error) {
       console.log(error)
       return res.status(500).json({msg :"error"+error})
    }
   }

   export const verify = (req , res) => {
    return res.status(200).json({msg:"success"})
   }
   




export default Register