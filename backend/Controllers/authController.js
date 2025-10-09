import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'

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
                error: "Email already registered",
                success:false
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
            savedUser,
            success:true 
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success:false
        })
    }
    
}

export const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            message:'All fields necessary',
            success:false
        })
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                success:false
            })
        }

        const isMatchPass = await bcrypt.compare(password, user.password);

        if(!isMatchPass){
            return res.status(401).json({
                message: 'Incorrect password',
                success:false
            })
        }

        const token = jwt.sign({
            userId:user._id,
            name:user.name,
            email:user.email,
            profilepic:user.profilepic
        }, process.env.JWTSECRET, {expiresIn:'24h'});

        //secure way to do cookies
        res.cookie('jwt', token, {
            maxAge: 24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
        })

        res.status(200).json({
            message:'Logged in',
            token:token,
            success:true
        })

        
    } catch (error) {
        res.status(500).json({
            message: `Internal server error, ${error}`,
            success:false
        })
    }

}

export const logout = (req, res) =>{
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({message:'Logged out!', success:true});
    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`,success:false});        
    }
}

export const updateProfilepic = async(req, res)=>{
    try {
        
        const {profilepic} = req.body;
        const userId = req.user._id;

        if(!profilepic){
            return res.status(400).json({message:`Profile picture required`});        
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilepic:uploadResponse.secure_url}, {new:true});
        res.status(200).json({
            message:"Updated profile picture",
            updatedUser
        });
        
    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`});        
    }
}

export const checkAuth = (req, res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`});        
    }
}
/* 
export const getUser = async(req, res) =>{
    try {
        const id = req.body;
        const {email, name, profilepic} = await User.findById(id);
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message:`Internal server error, ${error}`});        
    }
} */