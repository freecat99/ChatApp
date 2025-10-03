import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRouter from './Routes/authRouter.js';
import mssgRouter from './Routes/mssgRouter.js';
import { connectDB } from './Lib/db.js';


dotenv.config();
const PORT = process.env.PORT || 1600;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/message', mssgRouter);


app.listen(PORT, ()=>{
    console.log(`Server started at: ${PORT}`);
    connectDB();
})