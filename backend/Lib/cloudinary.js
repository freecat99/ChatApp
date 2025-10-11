console.log("✅ Cloudinary config file loaded");
import  dotenv from 'dotenv'
dotenv.config();
import {v2 as cloudinary} from 'cloudinary'


console.log('Cloudinary vars:', {
  CLOUDINARYCLOUD: process.env.CLOUDINARYCLOUD,
  CLOUDINARYAPIKEY: process.env.CLOUDINARYAPIKEY,
  CLOUDINARYAPISECRET: process.env.CLOUDINARYAPISECRET
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARYCLOUD,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
});

export default cloudinary;