//Library
import express from "express";
import bcrypt from "bcryptjs";

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
           const {email, password} = req.body.credentials;

           //Check Whether email exists
           const checkUser = await UserModel.findOne({email});

           if(checkUser){
               return res.json({error:"User already exists!"})
           }

           //Hash the Password
             const bcryptSalt= await bcrypt.genSalt(8);

             const hashedPassword= await bcrypt.hash(password,bcryptSalt)

           //Generate JWT auth Token

           //Return


       }catch(error){
           return res.status(500).json({error:error.message})
       }
});




export default Router;