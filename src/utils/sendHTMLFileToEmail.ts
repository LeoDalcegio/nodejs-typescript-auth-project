'use-strict';

import readHTMLFile from "./readHTMLFile";
import handlebars from 'handlebars';
import mailer from '../modules/mailer';
import Mail from "nodemailer/lib/mailer";

var fs = require('fs');

export default function sendHTMLFileToEmail(htmlFilePath: string, replacements: any, mailOptions: Mail.Options, callback: Function) {
    readHTMLFile(htmlFilePath, function(err: Error, html: string) {

        const template = handlebars.compile(html);

        const htmlToSend = template(replacements);

        mailOptions['html'] = htmlToSend;

        mailer.sendMail(mailOptions, (error: Error) => {
            if (error) {
                callback(error);
            }
            callback();
        });
    });
};