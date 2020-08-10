'use-strict';

import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { host, port, user, pass } from '../config/mail.json';

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
        partialsDir: path.resolve(__dirname, 'src', 'resources' , 'mail'),
        defaultLayout: undefined,
    },
    viewPath:  path.resolve(__dirname, 'src', 'resources' , 'mail'),
    extName: '.html'
}))

export default transport;