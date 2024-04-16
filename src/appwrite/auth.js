import config from "../config/config";

import { Client, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL) // Your API Endpoint
      .setProject(config.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async CreateAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // if user account exists then we call another function so that as soon as we confirm the user exists we can let the user login. Basically we call the login function that we will create if the account exists
        return this.LoginAccont();
      } else {
        return userAccount; //this will return null if it doesnt exist
      }
    } catch (error) {
      throw error;
    }
  }

  async LoginAccont({ email, password }) {
    try {
      const loginAcc = await this.account.createEmailSession(email, password);
      return loginAcc;
    } catch (error) {
      throw error;
    }
  }

  async getUserAccount() {
    try {
      return await this.account.get();
      //these are all features provided by appwrite, like you can get an account, login etc. You just need to read the docs.
    } catch (error) {
      throw error;
    }

    return null // you could just have used try ke andar if else to check if we did get the account and if not return nothing but here we just said return null outside try catch in case there is no account
  }

  //end session in the docs basically means logout
  async logout(){
    try{
        return await this.account.deleteSessions() //deleteSession() bhi hai
    }
    catch(error){
        throw error
    }
  }

}


const authService=new AuthService()
// created an object of the class that we will export and then we will use this object to use all the methods inside the class we created

export default authService