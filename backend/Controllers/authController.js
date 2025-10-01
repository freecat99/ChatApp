import bcrypt from 'bcryptjs'
import User from "../Models/userModel.js";

export const register = async(req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message:'All fields necessary'
        })
    }

    try {
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                message: "Email already registered"
            })
        };

        const salt = await bcrypt.genSalt(8);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashPass
        })

        const savedUser = await newUser.save();

        res.status(200).json({
            message: "User registered",
            savedUser 
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
    
}

export const login = async(req, res)=>{

}

export const logout = (req, res)=>{

}