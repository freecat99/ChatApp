import mongoose from "mongoose";

const messageschema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
},
{timestamps:true});

const Message = mongoose.model('Message', messageschema);

export default Message;