import express from 'express'
import dotenv from 'dotenv'

import authRouter from './Routes/authRouter.js';
import { connectDB } from './Lib/db.js';


dotenv.config();
const PORT = process.env.PORT || 1600;

const app = express();

app.use(express.json());

app.use('/auth', authRouter)


app.listen(PORT, ()=>{
    console.log(`Server started at: ${PORT}`);
    connectDB();
})