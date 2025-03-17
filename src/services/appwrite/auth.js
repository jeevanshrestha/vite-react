import conf from "../../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {

    account;
    client = new Client();

    constructor() {

        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password);
            }

        } catch (error) {
            console.log("Service Appwrite:: createAccount ::error", error);
        }
        return null;
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {

            console.log("Service Appwrite:: login ::error", error);
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            console.log("Appwrite Service :: logout :: error ", error);

        }

        return null;

    }
    async getCurrentUser() {
        try {
            // Check if the user is authenticated (session exists)
            const session = await this.account.getSession('current'); // 'current' is the default session ID
            if (!session) {
               return null;
            }
    
            // Now that we know the user is authenticated, we can fetch their information
            return await this.account.get();
    
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error ", error);
    
            // Handle case when user is not authenticated or other errors
            return null;
        }
    }
    


}

const authService = new AuthService();

export default authService;