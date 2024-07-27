import User from "../models/user_model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt';
import Listing from '../models/listing_model.js';

export const test = (req, res) => {
    res.json({
        message: "hh",
    });
};

export const updateUser = async (req, res, next) => {
    // console.log('user' , req.user.id);
    // console.log("req.params" , req.params.id);
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account'));
    }
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            {
                new: true
            }
        );

        const { password, ...rest } = updatedUser._doc;

        return res.status(200).json({
            success: true,
            ...rest
        });

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next) => {
    
    if(req.user.id !== req.params.id){
        return next(errorHandler(401 , 'You can only delete your own account'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        return res.status(201).json({
            message:'User has been deleted...'
        });
    } catch (error) {
        next(error);
    }
}

export const getUserListings = async(req,res,next) => {
    if(req.user.id === req.params.id){
        try{
           const listings = await Listing.find({userRef:req.params.id});
           res.status(200).json(listings);
        } catch(error){
            next(error);
        }
    }else{
        return next(errorHandler(401, 'You can only view your own listings'));
    }
}