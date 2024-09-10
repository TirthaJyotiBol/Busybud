import express from "express";
import UserController from "../controller/user.controller.js";

let UserRoute = express.Router();
let user_controller = new UserController();


UserRoute.get('/',(req,res)=>{
    res.send("Users");

});

UserRoute.post('/register',async(req,res)=>{
    let {name,email,password,role} = req.body.userDetails;
    let responseData = await user_controller.registerUser(email,name,role,password);
    res.json(responseData);
})

// Login User
UserRoute.post('/login',async (req,res)=>{
    let {email,password} = req.body;
    try{
        // let users
        let user = await user_controller.findUserByEmail(email);
        if(user){
            // check password
            if(password == user.password){
                
                return res.json({data:user,response:'ok',message:'User Found'});
            }
            // Password Not Matched
            else{
                res.json({data:null,response:'error',message:'Password Not Matched'});
            }
        }
        // user not found
        else{   
            res.json({data:null,response:'error',message:'User Not Found'});
        }
    }
    catch(e){
        console.log(e);
    }
})

export default UserRoute;