'use-strict';

var fs = require('fs');

export default function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};