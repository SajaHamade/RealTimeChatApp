import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js';
const verifyUser = async (req , res , next) =>{
try {
    const authHeader = req.headers.authorization; // Correct spelling
    if (!authHeader) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1]; // Split 'Bearer token'
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const decoded = jwt.verify(token , process.env.JWT_KEY);


    if(!decoded){
        return res.status(401).json({msg:"invalid token"})
    }

    const user = await UserModel.findOne({_id:decoded.id}).select('-pasword')
    //return the user without the password

    req.user = user ; //send the user via the request 

    next();
} catch (error) {
    
}
}


export default verifyUser ;