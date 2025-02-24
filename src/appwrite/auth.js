/* eslint-disable no-undef */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Initialize the Appwrite client
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create an account and automatically log in the user after creation
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Automatically log in after account creation
                return  this.login({ email, password });
            }

            return userAccount; // Return account details if login fails
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    // Login method
    async login({ email, password }){
        try {
            // Create a new session
            const session = await this.account.createEmailPasswordSession(email,password);
            return session;
        } catch (error){
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            return await this.account.get();
             // Return user details if session exists
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
        }
            // Return null if no session exists
            return null;
        
    }

    

    // Logout method
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }

     // Get user by user ID
     async getUserById(userId) {
        try {
            const user = await this.account.get(userId);
            return user;
        } catch (error) {
            console.error("AuthService :: getUserById :: error", error);
            return null;
        }
    }

   
    
}

const authService = new AuthService();

export default authService;
