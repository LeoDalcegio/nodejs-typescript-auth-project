'use-strict';

import { Request, Response } from "express";
import User from '../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import comparePasswords from '../utils/comparePasswords';
import encrypt from '../utils/encrypt';

export default class AuthController {
    async login(request: Request, response: Response) {
        const { email } = request.body;

        try {
            const user = await User.findOne({ email }).select('+password')

            if (!user) return response.status(400).send({ error: 'Email or password is wrong' });

            const validPassword = await comparePasswords(request.body.password, user.password);

            if (!validPassword) return response.status(401).send({ error: 'Invalid password' });

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: 604800,
            });

            user.password = undefined;

            return response.header('auth-token', token).send(user);
        } catch (err) {
            return response.status(401).send(err);
        }
    }

    async register(request: Request, response: Response) {
        const { email } = request.body;

        const emailExist = await User.findOne({ email })

        if (emailExist) return response.status(409).send({ error: 'Email already exist' });

        const hashPassword = await encrypt(request.body.password);

        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashPassword
        });

        try {
            await user.save();

            user.password = undefined;

            return response.send(user);
        } catch (err) {
            return response.status(400).send(err);
        }
    }
}
