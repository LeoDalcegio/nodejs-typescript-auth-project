'use-strict';

import { Request, Response } from "express";
import User from '../models/User';

export default class UsersController {
    async index(request: Request, response: Response) {
        const { page = 1 } = request.query;
        
        const users = await User.paginate({ }, { 
            page, 
            limit: 10 
        });
        
        return response.json(users);
    }

    async show(request: Request, response: Response) {
        const user = await User.findById(request.params.id);

        if(!user) {
            return response.status(404).send({error: 'User not found'});
        }
        
        return response.json(user);
    }

    async update(request: Request, response: Response) {
        try{
            const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            return response.json(user);
        }catch(err){
            return response.status(400).send(err)
        }
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params;
        
        try{
            await User.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err)
        }
    }
}
