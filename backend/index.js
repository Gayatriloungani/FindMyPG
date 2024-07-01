import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.mongo_db_url).then(() => {
    console.log("connected to db");
}).catch((error) => {
    console.log(error);
})


const app = express();

app.listen(3000 , () => {
 console.log("server running");
})