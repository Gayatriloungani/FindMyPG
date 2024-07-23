import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import pkg from 'jsonwebtoken';
import dotenv from 'dotenv';
const jwt = pkg;

dotenv.config;

export const signup = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashed password",
      });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {

    //   next(errorHandler(500 , error.message));
    next(error);
  }
};

export const signin = async(req,res,next) => {

  const {email , password} = req.body;
  try {
    
    const validUser = await User.findOne({email});
    if(!validUser) {
      return next(errorHandler(404 , 'User not found!'));
    }

    const validPassword = await bcrypt.compare(password , validUser.password);
    if(!validPassword){
      return next(errorHandler(401 , 'Wrong Credentials!'));
    }

    const token = jwt.sign({id:validUser._id} , process.env.JWT_SECRET, {
      expiresIn:"2h"
    })

    const options = {
      expiresIn : new Date(Date.now() + 3*24*60*60*1000),
      httpOnly : true
    }

    const {password:pass , ...rest} = validUser._doc;

    res.cookie("access_token" , token , options).status(200).json({
      success:true,
      token,
      rest
    })



  } catch (error) {
    next(errorHandler(500 , 'Internal Server Error')); 
  }
}

export const google = async(req,res,next) => {
  try {
    const user = await User.findOne({email : req.body.email});
    if(user){
      const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
      const {password:pass , ...rest} = user._doc;
      res.cookie('access_token' , token , {
        httpOnly:true,
        expiresIn:new Date(Date.now() + 3*24*60*60*1000),
      }).status(200).json(rest);
    }
    else{
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword , 10);
      const newUser = await User.create({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email:req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      
      const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET);
      const {password:pass , ...rest} = newUser._doc;
      res.cookie('access_token' , token , {
        httpOnly:true,
        expiresIn:new Date(Date.now() + 3*24*60*60*1000),
      }).status(200).json(rest);
    }
  } catch (error) {
    next(error) 
  }
}

export const signout = async(req,res,next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({
      message:'User has been logged out!'
    })
  } catch (error) {
    next(error);
  }
}