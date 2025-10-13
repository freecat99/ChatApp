import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";
import cloudinary from "../Lib/cloudinary.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUser}}).select('-password'); //net equal to logged user

        res.status(200).json(filteredUsers);
        
    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`});        
        
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id:friendId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:friendId},
                {senderId:friendId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`});        
    }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: friendId } = req.params;
    const myId = req.user?._id;

    if (!myId || !friendId) {
      return res.status(400).json({ message: "Missing sender or receiver ID" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: friendId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(200).json({ data: newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};
