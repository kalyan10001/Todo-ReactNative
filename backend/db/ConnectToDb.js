import mongoose from "mongoose"

export const ConnectToDb=async()=>{
    try {
        const res=await mongoose.connect(process.env.MONGO_URI);
        if(res)
            console.log("MongoDb Connected");
    } catch (error) {
        console.log(error)
    }
};