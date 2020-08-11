'use-strict';

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

const PORT = process.env.PORT || 3333;

mongoose.connect(process.env.DB_CONNECT, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
() => console.log('Connected to db!'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
