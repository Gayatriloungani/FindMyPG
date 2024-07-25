import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_route.js'
import authRouter from './routes/auth_route.js'
import listingRouter from './routes/listing_route.js'
import cookieParser from 'cookie-parser';
dotenv.config();

//databse connected
mongoose.connect(process.env.mongo_db_url).then(() => {
    console.log("connected to db");
}).catch((error) => {
    console.log(error);
})

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000 , () => {
 console.log("server running on port - 3000");
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



//error handling using middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})