import UserModel from "../models/users.model.js";

export default class UserRepository{
    async getAllUsers (){
        let users = await UserModel.find({});
        return users;
    }

    async findUserByEmail(email){
        let user = await UserModel.findOne({email:email});
        return user;
    }

    async registerUser(email,name,role,password){
        let findByEmail = await this.findUserByEmail(email);
        if(findByEmail){
            return {
                'status':false,
                'message':'User already there please use a different email '
            }; 
        }        
        try{
            let userData = new UserModel({
                'email':email,
                'role':role,
                'name':name,
                'password':password
            });
            let data = await userData.save();
            
            return {
                'status':true,
                'message':'User registered Successfully',
                'userData':data
            };
        }
        catch(e){
            return {
                'status':false,
                'message':'User Cannot be registered'
            };
        }
    }
}