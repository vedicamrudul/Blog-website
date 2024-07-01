import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL) // Your API Endpoint
      .setProject(config.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // if user account exists then we call another function so that as soon as we confirm the user exists we can let the user login. Basically we call the login function that we will create if the account exists
        return await this.loginAccount({ email, password });
      } else {
        return userAccount; //this will return null if it doesnt exist
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({email, password}) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log('Logged in:', session);
      console.log("mai ro dungi")
      return session;
    } catch (error) {
      console.log("mai aur bhi ro dungi")
      console.error('Login failed:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log('User:', user);
      return user;
    } catch (error) {
      console.error('You are not logged in.', error);
      throw error; // Rethrow the error to let the caller handle it
    } finally {
      console.log("getUserAccount executed");
    }
  }

  //end session in the docs basically means logout
  async logout() {
    try {
      return await this.account.deleteSessions(); //deleteSession() bhi hai
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
// created an object of the class that we will export and then we will use this object to use all the methods inside the class we created

export default authService;

