import mongoose from "mongoose";

const Connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to mongodb")
        

    }catch(err){

    }
}


export default Connect;