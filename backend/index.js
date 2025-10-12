import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './Routes/authRouter.js';
import mssgRouter from './Routes/mssgRouter.js';
import { connectDB } from './Lib/db.js';


dotenv.config();
const PORT = process.env.PORT || 1600;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use('/auth', authRouter);
app.use('/mssg', mssgRouter);


app.listen(PORT, ()=>{
    console.log(`Server started at: ${PORT}`);
    connectDB();
})