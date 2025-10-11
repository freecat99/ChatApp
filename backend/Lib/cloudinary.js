import {v2 as cloudinary} from 'cloudinary'
import  {config} from 'dotenv'

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARYCLOUD,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET
});

export default cloudinary;