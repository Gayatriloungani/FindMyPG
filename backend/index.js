import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_route.js'

dotenv.config();

//databse connected
mongoose.connect(process.env.mongo_db_url).then(() => {
    console.log("connected to db");
}).catch((error) => {
    console.log(error);
})


const app = express();

app.listen(3000 , () => {
 console.log("server running on port - 3000");
})

app.use('/api/user', userRouter);