'use-strict';

import express from 'express';
import UsersController from "@controllers/UsersController";
import AuthController from "@controllers/AuthController";
import verifyToken from './middlewares/verifyToken';

const routes = express.Router();

const usersController = new UsersController();
const authController = new AuthController();

routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.put('/users/:id',
    verifyToken,
    usersController.update        
);
routes.delete('/users/:id',
    verifyToken, 
    usersController.destroy
); 

routes.post('/auth/register', authController.register);
routes.post('/auth/login', authController.login);
//routes.post('/auth/forgot-password', authController.forgotPassword);
//routes.post('/auth/reset-password', authController.resetPassword);

export default routes;