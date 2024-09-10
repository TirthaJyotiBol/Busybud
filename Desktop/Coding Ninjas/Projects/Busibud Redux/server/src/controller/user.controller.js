import UserRepository from "../repo/Users.repo.js";

export default class UserController{

    constructor(){
        this.user_repo = new UserRepository();
    }

    getAllUsers = async ()=>{
        let users = await this.user_repo.getAllUsers();
        return users;
    }

    async findUserByEmail (email,password){
        let user = await this.user_repo.findUserByEmail(email);
        return user;
    }

    async registerUser (email,name,role,password){
        let registerUser = await this.user_repo.registerUser(email,name,role,password);
        return registerUser;
    }

}