import express from 'express'
import verifyUser from '../middleware/VerifyUser.js'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'
import { GetReceiverSocketId , io } from '../socket/socket.js'


const router = express.Router();

router.post('/send/:receiverId', verifyUser , async (req,res)=>{
    try {
    const {receiverId} = req.params ;
    console.log("Receiver Id",receiverId)
    const senderId = req.user._id;
    console.log("sender id got from token:",senderId)
    const {content} = req.body ;
    console.log("message sent is:",content)

    let conversation = await Conversation.findOne({
        participants: {$all : [senderId , receiverId]}  //all ensures that both participants are present in the participants array, regardless of their order.
    })

//if the two chat for the first time we will create a new conversation object for them
    if(!conversation){
        conversation = new Conversation({
            participants: [senderId , receiverId]
        })
       await conversation.save()   
     }

    const newMessage = new Message (
        {
            conversationId : conversation._id,
            sender : senderId ,
            content : content , 
            createdAt : new Date()
        }
        )
        await newMessage.save();

        const receiverSocketId = GetReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('new message', newMessage);
        }

return res.json(newMessage);}
 catch (error) {
  console.log(error);  
  res.status(500).json(error)
}
    
})




router.get('/read/:receiverId', verifyUser , async (req,res)=>{
    try {

        const {receiverId} = req.params ;
        const senderId = req.user._id;

        
    const conversation = await Conversation.findOne({
        participants: {$all : [senderId , receiverId]}  //all ensures that both participants are present in the participants array, regardless of their order.
    });

    if(!conversation){
        return res.status(404).json({message: "Conv Not found"})
        }

    const messages = await Message.find({
        conversationId : conversation._id 
    }).sort({createdAt : 1})

    return res.status(200).json(messages)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : error})
    }
})



export default router ;