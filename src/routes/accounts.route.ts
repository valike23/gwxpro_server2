import { FastifyInstance } from "fastify";
import { AccountsController } from "../modules/accounts/accounts.controller";


export const AccountsRoute =(fastify: FastifyInstance, options: any, done: (err?: Error) => void)=>{
    fastify.post('/accounts/login', AccountsController.loginCtrl);
   
    done(); 
}