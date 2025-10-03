import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../Models/userModel.js';

export const authenticated = async(req, res, next) =>{
    try {
        
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:'Unauthorized access'})
        }
        
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        
        if(!decoded){
            return res.status(401).json({message:'Invalid token'})
        }
        
        const user = await User.findById(decoded.userId).select("-password");
        
        req.user = user;
        
        next();

    } catch (error) {
        res.status(401).json({message:`Internal server error, ${error}`});
    }
}