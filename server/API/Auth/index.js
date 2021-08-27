//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import {UserModel} from "../../database/user";

const Router = express.Router();

/*
Route             /Signup
Description        Signup with email and Password
Params             none
Access             Public
Method             POST
*/

Router.post("/signup",async(req,res) => {
       try{
           const {email, password,fullname,phoneNumber} = req.body.credentials;

           //Check Whether email exists
           const checkUserByEmail = await UserModel.findOne({email});
           const checkUserByPhone = await UserModel.findOne({phoneNumber});
          
           if(checkUserByEmail||checkUserByPhone){
               return res.json({error:"User already exists!"})
           }

           //Hash the Password
             const bcryptSalt= await bcrypt.genSalt(8);

             const hashedPassword= await bcrypt.hash(password,bcryptSalt)

           //Save to DB
           await UserModel.create({
               ...req.body.credentials,
               password:hashedPassword,
           })

           //Generate JWT auth Token
           const token = jwt.sign({user:{fullname,email}}, "ZomatoAPP");

           //Return
           return res.status(200).json({token,status:"Success"});

       }catch(error){
           return res.status(500).json({error:error.message})
       }
});




export default Router;